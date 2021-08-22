const Joi = require("joi");

const joiContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$"))
    .required(),
});

module.exports = joiContactSchema;
