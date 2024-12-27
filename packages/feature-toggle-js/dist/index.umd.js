(function(i,e){typeof exports=="object"&&typeof module<"u"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):(i=typeof globalThis<"u"?globalThis:i||self,e(i["feature-toggle-js"]={}))})(this,function(i){"use strict";var a=Object.defineProperty;var c=(i,e,t)=>e in i?a(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var o=(i,e,t)=>c(i,typeof e!="symbol"?e+"":e,t);const s=class s{constructor(n){o(this,"toggles",{});o(this,"enableLogging",!1);n!=null&&n.enableLogging&&(this.enableLogging=n.enableLogging)}static init(n){this.instance||(this.instance=new s(n),this.instance.loadTogglesFromEnvironment(),this.instance.enableLogging&&console.log("FeatureToggleManager initialized with options:",n))}loadTogglesFromEnvironment(){Object.keys(process.env).forEach(n=>{n.startsWith("TOGGLE_")&&(this.toggles[n.replace("TOGGLE_","")]=process.env[n].toLowerCase()==="true"||process.env[n].toLowerCase()==="on")}),this.enableLogging&&console.log("Toggles loaded:",this.toggles)}static enabled(n){if(!this.instance)throw new Error("FeatureToggleManager is not initialized. Call init() first.");const l=!!this.instance.toggles[n];return this.instance.enableLogging&&console.log(`Feature "${n}" is ${l?"enabled":"disabled"}`),l}};o(s,"instance");let e=s;const t=e.init.bind(e),g=e.enabled.bind(e);i.enabled=g,i.init=t,Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})});
