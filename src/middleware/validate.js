export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(400).json({
        meta: {
          success: false,
          message: "Validation failed",
          errors,
        },
      });
    }

    req.body = value; // sanitized data
    next();
  };
};
