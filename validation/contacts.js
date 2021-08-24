const Joi = require("joi");

const joiAddContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$"))
    .required(),
});

const joiChangeContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().pattern(
    new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$")
  ),
});

module.exports = {
  joiAddContactSchema,
  joiChangeContactSchema,
};
