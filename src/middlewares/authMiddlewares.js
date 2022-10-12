import bcrypt from 'bcrypt';
import { stripHtml } from 'string-strip-html';
import { signUpSchema, signInSchema } from '../models/authModel.js';
import { actuallyCheckIfEmailAlreadyExists } from '../controllers/authControllers.js';


export const validateSignUp = (req, res, next) => {
  const signUpValidation = signUpSchema.validate(req.body, {abortEarly: false});
  
  if (signUpValidation.error) {
    const erros = signUpValidation.error.details.map((error) => error.message);
    return res.status(422).json({ status: 422, message: erros });
  }

  const signUpInfo = {
    name: stripHtml(validateSignUp.value.name).result,
    email: stripHtml(validateSignUp.value.email).result,
    password: validateSignUp.value.password,
    confirmPassword: validateSignUp.value.confirmPassword
  }

  res.locals.signUpInfo = signUpInfo;
  next();
  return true;
};


export const checkEmailAlreadyExists = async (req, res, next) => {
  const { email } = res.locals.signUpInfo;
  const emailAlreadyExists = await actuallyCheckIfEmailAlreadyExists(email);
  
  if (emailAlreadyExists) {
    return res.status(409).json({ status: 409, message: 'Email already exists' });
  }

  next();
  return true;
};


export const validateSignIn = (req, res, next) => {
  const signInValidation = signInSchema.validate(req.body, {abortEarly: false});
  
  if (signInValidation.error) {
    const erros = signInValidation.error.details.map((error) => error.message);
    return res.status(422).json({ status: 422, message: erros });
  }

  const signInInfo = {
    email: stripHtml(validateSignIn.value.email).result,
    password: validateSignIn.value.password
  }

  res.locals.signInInfo = signInInfo;
  next();
  return true;
};


export const checkEmailPassword = async (req, res, next) => {
  const { email, password } = res.locals.signInInfo;
  const hash = await actuallyCheckPassword(email);
  
  if (!hash) {
    return res.status(401).json({ status: 401, message: 'Invalid email or password!' });
  }

  const passwordMatch = await bcrypt.compare(password, hash);
  
  if (!passwordMatch) {
    return res.status(401).json({ status: 401, message: 'Invalid email or password!' });
  }

  next();
  return true;
};