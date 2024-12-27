export type FeatureToggleManagerOptions = {
    config?: Record<string, boolean>;       // For browser: Preloaded toggles from a config
    apiUrl?: string;                        // For browser: API endpoint to fetch toggles
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

        if (this.isNodeEnvironment()) {
            this.loadTogglesFromEnvironment();
        } else if (options?.config) {
            this.loadTogglesFromConfig(options.config);
        } else if (options?.apiUrl) {
            this.loadTogglesFromApi(options.apiUrl);
        }
    }

    /**
     * Detect if the environment is Node.js.
     */
    private isNodeEnvironment(): boolean {
        return typeof process !== "undefined" && process.env !== undefined;
    }

    /**
     * Load toggles from a configuration object (Browser).
     * @param config - Preloaded configuration object.
     */
    private loadTogglesFromConfig(config: Record<string, boolean>): void {
        this.toggles = { ...config };
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
            this.toggles = { ...data };
        } catch (error) {
            console.error("Error fetching toggles from API:", error);
        }
    }

    /**
     * Initialize the FeatureToggleManager and load toggles based on the environment.
     */
    static async init(options?: FeatureToggleManagerOptions): Promise<void> {
        if (!this.instance) {
            this.instance = new FeatureToggleManager(options);

            if (!this.instance.isNodeEnvironment() && options?.apiUrl) {
                await this.instance.loadTogglesFromApi(options.apiUrl);
            }

            if (this.instance.enableLogging) {
                console.log("FeatureToggleManager initialized with toggles:", this.instance.toggles);
            }
        }
    }

    /**
     * Load all environment variables prefixed with "TOGGLE_"
     * and store them as feature toggles.
     */
    private loadTogglesFromEnvironment(): void {
        Object.keys(process.env).forEach((key) => {
            if (key.startsWith("TOGGLE_")) {
                this.toggles[key] = process.env[key].toLowerCase() === "true";
            }
        });

        if (this.enableLogging) {
            console.log("Toggles loaded:", this.toggles);
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
        const isEnabled = !!this.instance.toggles[feature];

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
