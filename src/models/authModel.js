import joi from 'joi';

export const signUpSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().min(8).required(),
  confirmPassword: joi.ref('password').required()
});

export const signInSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().min(8).required()
});