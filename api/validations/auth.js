const Joi = require("joi");

const validateEmailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const register = Joi.object({
  email: Joi.string().regex(validateEmailRegex).required(),
  password: Joi.string().min(6).max(16).required(),
}).required();

const login = Joi.object({
  email: Joi.string().regex(validateEmailRegex).required(),
  password: Joi.string().min(6).max(16).required(),
  remember: Joi.boolean().allow(false)
});

module.exports = {
  register,
  login,
  validateEmailRegex,
};
