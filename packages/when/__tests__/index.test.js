import when from "../src/index.js";
import sinon from "sinon";
import { expect } from "chai";

describe('when', () => {
  it('should call truthyFn when condition is true', () => {
    const truthyFn = sinon.stub();
    const falsyFn = sinon.stub();

    when(true, truthyFn, falsyFn);

    expect(truthyFn.called).to.be.true;
    expect(falsyFn.called).to.be.false;
  });

  it('should call falsyFn when condition is false', () => {
    const truthyFn = sinon.stub();
    const falsyFn = sinon.stub();

    when(false, truthyFn, falsyFn);

    expect(falsyFn.called).to.be.true;
    expect(truthyFn.called).to.be.false;
  });
});
