type FeatureToggleManagerOptions = {
    enableLogging?: boolean;
};

class FeatureToggleManager {
    private static instance: FeatureToggleManager;
    private toggles: Record<string, boolean> = {};
    private enableLogging: boolean = false;

    private constructor(options?: FeatureToggleManagerOptions) {
        if (options?.enableLogging) {
            this.enableLogging = options.enableLogging;
        }
    }

    /**
     * Initialize the FeatureToggleManager and load toggles from the environment.
     */
    static init(options?: FeatureToggleManagerOptions): void {
        if (!this.instance) {
            this.instance = new FeatureToggleManager(options);
            this.instance.loadTogglesFromEnvironment();

            if (this.instance.enableLogging) {
                console.log("FeatureToggleManager initialized with options:", options);
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
                this.toggles[key.replace("TOGGLE_", "")] = (process.env[key].toLowerCase() === "true" || process.env[key].toLowerCase() === "on");
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

export const init = FeatureToggleManager.init.bind(FeatureToggleManager);
export const enabled = FeatureToggleManager.enabled.bind(FeatureToggleManager);
