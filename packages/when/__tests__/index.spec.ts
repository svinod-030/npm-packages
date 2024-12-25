import when from "../src";

describe('when', () => {
  it('should call truthyFn when condition is true', () => {
    const truthyFn = jest.fn();
    const falsyFn = jest.fn();

    when(true, truthyFn, falsyFn);

    expect(truthyFn).toHaveBeenCalled();
    expect(falsyFn).not.toHaveBeenCalled();
  });

  it('should call falsyFn when condition is false', () => {
    const truthyFn = jest.fn();
    const falsyFn = jest.fn();

    when(false, truthyFn, falsyFn);

    expect(falsyFn).toHaveBeenCalled();
    expect(truthyFn).not.toHaveBeenCalled();
  });
});
