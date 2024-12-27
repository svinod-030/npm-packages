var o = Object.defineProperty;
var a = (s, e, n) => e in s ? o(s, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[e] = n;
var t = (s, e, n) => a(s, typeof e != "symbol" ? e + "" : e, n);
const g = class g {
  constructor(e) {
    t(this, "toggles", {});
    t(this, "enableLogging", !1);
    e != null && e.enableLogging && (this.enableLogging = e.enableLogging);
  }
  /**
   * Initialize the FeatureToggleManager and load toggles from the environment.
   */
  static init(e) {
    this.instance || (this.instance = new g(e), this.instance.loadTogglesFromEnvironment(), this.instance.enableLogging && console.log("FeatureToggleManager initialized with options:", e));
  }
  /**
   * Load all environment variables prefixed with "TOGGLE_"
   * and store them as feature toggles.
   */
  loadTogglesFromEnvironment() {
    Object.keys(process.env).forEach((e) => {
      e.startsWith("TOGGLE_") && (this.toggles[e.replace("TOGGLE_", "")] = process.env[e].toLowerCase() === "true" || process.env[e].toLowerCase() === "on");
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
    const n = !!this.instance.toggles[e];
    return this.instance.enableLogging && console.log(`Feature "${e}" is ${n ? "enabled" : "disabled"}`), n;
  }
};
t(g, "instance");
let i = g;
const c = i.init.bind(i), r = i.enabled.bind(i);
export {
  r as enabled,
  c as init
};
