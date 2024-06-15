export type callbackFn = (...args: any[]) => void
export type when = (condition: boolean, truthyFn: callbackFn, falsyFn: callbackFn) => void;
