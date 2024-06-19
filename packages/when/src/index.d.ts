export type callbackFn = (...args: any[]) => void
/**
 executes a callback function based on the expression passed

 @example
 ```
 import when = require('sv-when');

 when(condition, truthyFn, falsyFn);
 ```
 */
declare function when(condition: boolean, truthyFn: callbackFn, falsyFn: callbackFn): void;

export default when;
