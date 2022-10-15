import joi from 'joi';

export const signUpSchema = joi.object({
  name: joi.string().required().trim(),
  email: joi.string().email().required().trim(),
  password: joi.string().min(8).required(),
  confirmPassword: joi.string().required().valid(joi.ref('password')),
});

export const signInSchema = joi.object({
  email: joi.string().email().required().trim(),
  password: joi.string().min(8).required()
});