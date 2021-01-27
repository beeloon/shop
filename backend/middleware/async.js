export const asyncHandler = (callback) =>
  function asyncHandlerWrap(...args) {
    const cbReturn = callback(...args);
    const next = args[args.length - 1];

    return Promise.resolve(cbReturn).catch(next);
  };
