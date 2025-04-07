export type FeatureToggleManagerOptions = {
    config?: Record<string, boolean>;       // Preloaded toggles from a config
    apiUrl?: string;                        // API endpoint to fetch toggles
    enableLogging?: boolean;                // Enable logging for debugging
};

class FeatureToggleManager {
    private static instance: FeatureToggleManager;
    private toggles: Record<string, boolean> = {};
    private enableLogging: boolean = false;

    private constructor(options?: FeatureToggleManagerOptions) {
        if (options?.enableLogging) {
            this.enableLogging = options.enableLogging;
        }
        this.loadToggles(options);
    }

    /**
     * Initialize the FeatureToggleManager and load toggles based on the environment.
     */
    static async init(options?: FeatureToggleManagerOptions): Promise<void> {
        if (!this.instance) {
            this.instance = new FeatureToggleManager(options);
            if (this.instance.enableLogging) {
                console.log("FeatureToggleManager initialized with toggles:", this.instance.toggles);
            }
        }
        this.instance.loadToggles(options);
    }

    private loadToggles(options: FeatureToggleManagerOptions) {
        if (this.isNodeEnvironment()) {
            this.loadTogglesFromEnvironment();
        }
        if (options?.config) {
            this.loadTogglesFromConfig(options.config);
        }
        if (options?.apiUrl) {
            this.loadTogglesFromApi(options.apiUrl);
        }
    }

    /**
     * Detect if the environment is Node.js.
     */
    private isNodeEnvironment(): boolean {
        return typeof process !== "undefined" && 
            typeof process.env === "object" &&
            process.env !== null;
    }
    
    /**
     * Load toggles from a configuration object (Browser).
     * @param config - Preloaded configuration object.
     */
    private loadTogglesFromConfig(config: Record<string, boolean>): void {
        // Merge with existing toggles, with config taking precedence
        this.toggles = { ...this.toggles, ...config };
        
        if (this.enableLogging) {
            console.log("Toggles loaded from config:", this.toggles);
        }
    }

    /**
     * Fetch toggles from an API endpoint (Browser).
     * @param apiUrl - API endpoint to fetch toggles.
     */
    private async loadTogglesFromApi(apiUrl: string): Promise<void> {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch toggles from API: ${response.statusText}`);
            }
            const data: Record<string, boolean> = await response.json();
            this.toggles = { ...this.toggles, ...data };
        } catch (error) {
            console.error("Error fetching toggles from API:", error);
        }
    }

    /**
     * Load all environment variables prefixed with "TOGGLE_"
     * and store them as feature toggles.
     */
    private loadTogglesFromEnvironment(): void {
        Object.keys(process.env).forEach((key) => {
            if (key.startsWith("TOGGLE_")) {
                const value = process.env[key];
                // Store without the TOGGLE_ prefix for consistency
                const featureName = key.replace("TOGGLE_", "");
                this.toggles[featureName] = value?.toLowerCase() === "true" || 
                                          value?.toLowerCase() === "on" || 
                                          value?.toLowerCase() === "yes";
            }
        });

        if (this.enableLogging) {
            console.log("Toggles loaded from environment:", this.toggles);
        }
    }

    /**
     * Check if a feature is enabled.
     * @param feature - Name of the feature (case-sensitive).
     * @returns true if enabled, false otherwise.
     */
    static enabled(feature: string): boolean {
        if (!this.instance) {
            throw new Error("FeatureToggleManager is not initialized. Call init() first.");
        }
        
        // Check both with and without the TOGGLE_ prefix (for backward compatibility)
        console.log("toggles in enabled - ", this.instance.toggles);
        const isEnabled = !!this.instance.toggles[feature];
                          // || 
                          // !!this.instance.toggles[`TOGGLE_${feature}`];

        if (this.instance.enableLogging) {
            console.log(`Feature "${feature}" is ${isEnabled ? "enabled" : "disabled"}`);
        }

        return isEnabled;
    }
}

type EnabledType = (feature: string) => boolean;
type InitType = (options?: FeatureToggleManagerOptions) => Promise<void>;

export const init: InitType = FeatureToggleManager.init.bind(FeatureToggleManager);
export const enabled: EnabledType = FeatureToggleManager.enabled.bind(FeatureToggleManager);
