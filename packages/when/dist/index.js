"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const when = (condition, truthyFn, falsyFn) => {
    condition ? truthyFn() : falsyFn();
};
exports.default = when;
