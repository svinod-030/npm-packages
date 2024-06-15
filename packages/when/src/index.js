const when = (condition, truthyFn, falsyFn) => {
  condition ? truthyFn() : falsyFn()
}

export default when;
