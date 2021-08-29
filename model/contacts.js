const { Schema, model } = require("mongoose");
const { Joi } = require("joi");

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/;

const productSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "The name is required field"],
    },
    phone: {
      type: String,
      require: [true, "The name is required field"],
      match: phoneRegexp,
      unique: true,
    },
    email: {
      type: String,
      require: [true, "The name is required field"],
      match: emailRegexp,
      unique: true,
    },
  },
  { versionKey: false, timesstamps: true }
);

const joiSchemaAddContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
});

const joiSchemaChangeContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(emailRegexp),
  phone: Joi.string().pattern(phoneRegexp),
});

const Contact = model("contact", productSchema);

module.exports = {
  Contact,
  joiSchemaAddContact,
  joiSchemaChangeContact,
};
