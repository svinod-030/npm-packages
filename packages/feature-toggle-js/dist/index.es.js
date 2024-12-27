var l = Object.defineProperty;
var r = (n, e, i) => e in n ? l(n, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : n[e] = i;
var t = (n, e, i) => r(n, typeof e != "symbol" ? e + "" : e, i);
const g = class g {
  constructor(e) {
    t(this, "toggles", {});
    t(this, "enableLogging", !1);
    e != null && e.enableLogging && (this.enableLogging = e.enableLogging), this.isNodeEnvironment() ? this.loadTogglesFromEnvironment() : e != null && e.config ? this.loadTogglesFromConfig(e.config) : e != null && e.apiUrl && this.loadTogglesFromApi(e.apiUrl);
  }
  /**
   * Detect if the environment is Node.js.
   */
  isNodeEnvironment() {
    return typeof process < "u" && process.env !== void 0;
  }
  /**
   * Load toggles from a configuration object (Browser).
   * @param config - Preloaded configuration object.
   */
  loadTogglesFromConfig(e) {
    this.toggles = { ...e };
  }
  /**
   * Fetch toggles from an API endpoint (Browser).
   * @param apiUrl - API endpoint to fetch toggles.
   */
  async loadTogglesFromApi(e) {
    try {
      const i = await fetch(e);
      if (!i.ok)
        throw new Error(`Failed to fetch toggles from API: ${i.statusText}`);
      const a = await i.json();
      this.toggles = { ...a };
    } catch (i) {
      console.error("Error fetching toggles from API:", i);
    }
  }
  /**
   * Initialize the FeatureToggleManager and load toggles based on the environment.
   */
  static async init(e) {
    this.instance || (this.instance = new g(e), !this.instance.isNodeEnvironment() && (e != null && e.apiUrl) && await this.instance.loadTogglesFromApi(e.apiUrl), this.instance.enableLogging && console.log("FeatureToggleManager initialized with toggles:", this.instance.toggles));
  }
  /**
   * Load all environment variables prefixed with "TOGGLE_"
   * and store them as feature toggles.
   */
  loadTogglesFromEnvironment() {
    Object.keys(process.env).forEach((e) => {
      e.startsWith("TOGGLE_") && (this.toggles[e] = process.env[e].toLowerCase() === "true" || process.env[e].toLowerCase() === "on");
    }), this.enableLogging && console.log("Toggles loaded:", this.toggles);
  }
  /**
   * Check if a feature is enabled.
   * @param feature - Name of the feature (case-sensitive).
   * @returns true if enabled, false otherwise.
   */
  static enabled(e) {
    if (!this.instance)
      throw new Error("FeatureToggleManager is not initialized. Call init() first.");
    const i = !!this.instance.toggles[e];
    return this.instance.enableLogging && console.log(`Feature "${e}" is ${i ? "enabled" : "disabled"}`), i;
  }
};
t(g, "instance");
let s = g;
const c = s.init.bind(s), d = s.enabled.bind(s);
export {
  d as enabled,
  c as init
};
