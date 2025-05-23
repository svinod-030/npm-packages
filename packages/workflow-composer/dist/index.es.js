var h = Object.defineProperty;
var r = (n, t, s) => t in n ? h(n, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[t] = s;
var i = (n, t, s) => r(n, typeof t != "symbol" ? t + "" : t, s);
class p {
  constructor() {
    i(this, "steps");
    i(this, "context");
    i(this, "history");
    i(this, "isRunning");
    i(this, "runningStep");
    this.steps = /* @__PURE__ */ new Map(), this.context = {}, this.history = [], this.isRunning = !1, this.runningStep = "init";
  }
  addStep(t, s, e) {
    if (typeof t != "string" || typeof s != "function" || typeof e != "function")
      throw new Error("Invalid step name or functions");
    this.steps.set(t, { stepFn: s, rollbackFn: e });
  }
  async run() {
    if (this.isRunning) throw new Error("Already running");
    this.isRunning = !0;
    try {
      for (; this.runningStep && this.steps.has(this.runningStep); ) {
        const t = this.steps.get(this.runningStep);
        this.history.push(this.runningStep);
        const s = await t.stepFn(this.context);
        this.runningStep = s || null;
      }
      return this.isRunning = !1, this.context;
    } catch (t) {
      throw await this.rollback(), this.isRunning = !1, t;
    }
  }
  async rollback() {
    for (; this.history.length > 0; ) {
      const t = this.history.pop();
      await this.steps.get(t).rollbackFn(this.context);
    }
  }
  reset() {
    this.steps = /* @__PURE__ */ new Map(), this.context = {}, this.history = [], this.isRunning = !1, this.runningStep = "init";
  }
}
export {
  p as default
};
