import { Router } from 'express';

//Auth
import { validateSignUp, checkEmailAlreadyExists, validateSignIn, checkEmailPassword } from '../middlewares/authMiddlewares.js';
import { signUp, signIn } from '../controllers/authControllers.js';


const router = Router();

//Auth
router.post('/signup', validateSignUp, checkEmailAlreadyExists, signUp);
router.post('/signin', validateSignIn, checkEmailPassword, signIn);