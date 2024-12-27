export type FeatureToggleManagerOptions = {
    config?: Record<string, boolean>;
    apiUrl?: string;
    enableLogging?: boolean;
};
type EnabledType = (feature: string) => boolean;
type InitType = (options?: FeatureToggleManagerOptions) => Promise<void>;
export declare const init: InitType;
export declare const enabled: EnabledType;
export {};
