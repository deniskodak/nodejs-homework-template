const { Schema, model } = require("mongoose");
const gravatar = require("gravatar");

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const { SECRET_KEY } = process.env;

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarUrl: {
      type: String,
      default: () => {
        return gravatar.url(this.email);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      // required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);
UserSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.setToken = function () {
  this.token = jwt.sign({ id: this._id }, SECRET_KEY);
};

UserSchema.methods.setVerifyToken = function () {
  this.verifyToken = v4();
};

const joiSchemaAddUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email(emailRegexp).required(),
  subscription: Joi.string(),
});

const joiSchemaChangeUser = Joi.object({
  password: Joi.string(),
  email: Joi.string().email(emailRegexp),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiSchemaVerifyEmail = Joi.object({
  email: Joi.string().email(emailRegexp).required(),
});

const User = model("user", UserSchema);

module.exports = {
  User,
  joiSchemaAddUser,
  joiSchemaChangeUser,
  joiSchemaVerifyEmail,
};
