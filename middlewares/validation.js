const validation = (schema) => {
  const validFunc = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: error.message,
      });
    }
    next();
  };

  return validFunc;
};

module.exports = validation;
