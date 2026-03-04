export function asyncHandler(fn) {
  return function (req, res, next) {
    // run the async function
    fn(req, res, next)
      .then(function () {
        // success case (nothing to do here)
      })
      .catch(function (error) {
        // if error happens, pass it to Express error middleware
        next(error);
      });
  };
}
