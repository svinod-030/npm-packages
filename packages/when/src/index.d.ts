export type callbackFn = (...args: any[]) => void
/**
 Detect whether the terminal supports Unicode.

 @example
 ```
 import when = require('sv-when');

 when(condition, truthyFn, falsyFn);
 ```
 */
declare function when(condition: boolean, truthyFn: callbackFn, falsyFn: callbackFn): void;

export default when;
