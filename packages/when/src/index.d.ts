export type callbackFn = (...args: any[]) => void
/**
 executes a callback function based on the given expression (alternative to ternary operator).

 @example
 ```
 import when = require('sv-when');

 when(condition, truthyFn, falsyFn);
 ```
 */
declare function when(condition: boolean, truthyFn: callbackFn, falsyFn: callbackFn): void;

export default when;
