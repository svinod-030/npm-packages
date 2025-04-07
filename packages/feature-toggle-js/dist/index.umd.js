(function(i,t){typeof exports=="object"&&typeof module<"u"?t(exports):typeof define=="function"&&define.amd?define(["exports"],t):(i=typeof globalThis<"u"?globalThis:i||self,t(i["feature-toggle-js"]={}))})(this,function(i){"use strict";var r=Object.defineProperty;var c=(i,t,s)=>t in i?r(i,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):i[t]=s;var g=(i,t,s)=>c(i,typeof t!="symbol"?t+"":t,s);const o=class o{constructor(e){g(this,"toggles",{});g(this,"enableLogging",!1);e!=null&&e.enableLogging&&(this.enableLogging=e.enableLogging),this.loadToggles(e)}loadToggles(e){this.isNodeEnvironment()&&this.loadTogglesFromEnvironment(),e!=null&&e.config&&this.loadTogglesFromConfig(e.config),e!=null&&e.apiUrl&&this.loadTogglesFromApi(e.apiUrl)}static async init(e){this.instance||(this.instance=new o(e),this.instance.enableLogging&&console.log("FeatureToggleManager initialized with toggles:",this.instance.toggles)),this.instance.loadToggles(e)}isNodeEnvironment(){return typeof process<"u"&&typeof process.env=="object"&&process.env!==null}loadTogglesFromConfig(e){this.toggles={...this.toggles,...e},this.enableLogging&&console.log("Toggles loaded from config:",this.toggles)}async loadTogglesFromApi(e){try{const n=await fetch(e);if(!n.ok)throw new Error(`Failed to fetch toggles from API: ${n.statusText}`);const l=await n.json();this.toggles={...this.toggles,...l}}catch(n){console.error("Error fetching toggles from API:",n)}}loadTogglesFromEnvironment(){Object.keys(process.env).forEach(e=>{if(e.startsWith("TOGGLE_")){const n=process.env[e],l=e.replace("TOGGLE_","");this.toggles[l]=(n==null?void 0:n.toLowerCase())==="true"||(n==null?void 0:n.toLowerCase())==="on"||(n==null?void 0:n.toLowerCase())==="yes"}}),this.enableLogging&&console.log("Toggles loaded from environment:",this.toggles)}static enabled(e){if(!this.instance)throw new Error("FeatureToggleManager is not initialized. Call init() first.");console.log("toggles in enabled - ",this.instance.toggles);const n=!!this.instance.toggles[e];return this.instance.enableLogging&&console.log(`Feature "${e}" is ${n?"enabled":"disabled"}`),n}};g(o,"instance");let t=o;const s=t.init.bind(t),a=t.enabled.bind(t);i.enabled=a,i.init=s,Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})});
