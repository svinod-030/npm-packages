import { init, enabled } from '../src/core';

describe("feature toggle manager", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });
    describe("enabled", () => {
        beforeAll(() => {
            process.env.TOGGLE_TEST_FEATURE = "true";
            process.env.TOGGLE_DISABLED_FEATURE = "false";
            process.env.TOGGLE_BETA_FEATURE = "ON";
        });

        it("should throw an error if enabled() is called before init()", () => {
            // init();

            expect(() => enabled("TEST_FEATURE")).toThrowError(
                "FeatureToggleManager is not initialized. Call init() first."
            );
        });

        it("should load toggles and check their state", () => {
            init();

            expect(enabled("TEST_FEATURE")).toBe(true);
            expect(enabled("DISABLED_FEATURE")).toBe(false);
            expect(enabled("MISSING_FEATURE")).toBe(false);
        });

        it("should return true when the toggle value is ON", () => {
            expect(enabled("BETA_FEATURE")).toBe(true);
        });
    });
});