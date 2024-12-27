var l = Object.defineProperty;
var r = (s, e, i) => e in s ? l(s, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[e] = i;
var t = (s, e, i) => r(s, typeof e != "symbol" ? e + "" : e, i);
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
      e.startsWith("TOGGLE_") && (this.toggles[e] = process.env[e].toLowerCase() === "true");
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
let n = g;
const c = n.init.bind(n), d = n.enabled.bind(n);
export {
  d as enabled,
  c as init
};
