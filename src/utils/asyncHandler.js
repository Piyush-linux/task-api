export function asyncHandler(fn) {
  return function (req, res, next) {
    // run async function
    fn(req, res, next)
      .then(function () {
        // success case
      })
      .catch(function (error) {
        // error case
        next(error);
      });
  };
}
