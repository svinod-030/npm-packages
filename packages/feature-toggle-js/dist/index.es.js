var l = Object.defineProperty;
var a = (g, e, s) => e in g ? l(g, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : g[e] = s;
var i = (g, e, s) => a(g, typeof e != "symbol" ? e + "" : e, s);
const n = class n {
  constructor(e) {
    i(this, "toggles", {});
    i(this, "enableLogging", !1);
    e != null && e.enableLogging && (this.enableLogging = e.enableLogging), this.loadToggles(e);
  }
  loadToggles(e) {
    this.isNodeEnvironment() && this.loadTogglesFromEnvironment(), e != null && e.config && this.loadTogglesFromConfig(e.config), e != null && e.apiUrl && this.loadTogglesFromApi(e.apiUrl);
  }
  /**
   * Initialize the FeatureToggleManager and load toggles based on the environment.
   */
  static async init(e) {
    this.instance || (this.instance = new n(e), this.instance.enableLogging && console.log("FeatureToggleManager initialized with toggles:", this.instance.toggles)), this.instance.loadToggles(e);
  }
  /**
   * Detect if the environment is Node.js.
   */
  isNodeEnvironment() {
    return typeof process < "u" && typeof process.env == "object" && process.env !== null;
  }
  /**
   * Load toggles from a configuration object (Browser).
   * @param config - Preloaded configuration object.
   */
  loadTogglesFromConfig(e) {
    this.toggles = { ...this.toggles, ...e }, this.enableLogging && console.log("Toggles loaded from config:", this.toggles);
  }
  /**
   * Fetch toggles from an API endpoint (Browser).
   * @param apiUrl - API endpoint to fetch toggles.
   */
  async loadTogglesFromApi(e) {
    try {
      const s = await fetch(e);
      if (!s.ok)
        throw new Error(`Failed to fetch toggles from API: ${s.statusText}`);
      const o = await s.json();
      this.toggles = { ...this.toggles, ...o };
    } catch (s) {
      console.error("Error fetching toggles from API:", s);
    }
  }
  /**
   * Load all environment variables prefixed with "TOGGLE_"
   * and store them as feature toggles.
   */
  loadTogglesFromEnvironment() {
    Object.keys(process.env).forEach((e) => {
      if (e.startsWith("TOGGLE_")) {
        const s = process.env[e], o = e.replace("TOGGLE_", "");
        this.toggles[o] = (s == null ? void 0 : s.toLowerCase()) === "true" || (s == null ? void 0 : s.toLowerCase()) === "on" || (s == null ? void 0 : s.toLowerCase()) === "yes";
      }
    }), this.enableLogging && console.log("Toggles loaded from environment:", this.toggles);
  }
  /**
   * Check if a feature is enabled.
   * @param feature - Name of the feature (case-sensitive).
   * @returns true if enabled, false otherwise.
   */
  static enabled(e) {
    if (!this.instance)
      throw new Error("FeatureToggleManager is not initialized. Call init() first.");
    console.log("toggles in enabled - ", this.instance.toggles);
    const s = !!this.instance.toggles[e];
    return this.instance.enableLogging && console.log(`Feature "${e}" is ${s ? "enabled" : "disabled"}`), s;
  }
};
i(n, "instance");
let t = n;
const c = t.init.bind(t), h = t.enabled.bind(t);
export {
  h as enabled,
  c as init
};
