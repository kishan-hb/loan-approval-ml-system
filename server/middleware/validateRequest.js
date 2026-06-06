function validateRequest(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return next({
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.details.map((detail) => detail.message)
      });
    }   
     
    req.body = value;
    return next();
  };
}

module.exports = validateRequest;