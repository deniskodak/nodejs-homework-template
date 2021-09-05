const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegexp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    phone: {
      type: String,
      require: true,
      match: phoneRegexp,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      match: emailRegexp,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaAddContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
});

const joiSchemaChangeContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(emailRegexp),
  phone: Joi.string().pattern(phoneRegexp),
  favorite: Joi.boolean(),
});

const Contact = model("contact", productSchema);

module.exports = {
  Contact,
  joiSchemaAddContact,
  joiSchemaChangeContact,
};
