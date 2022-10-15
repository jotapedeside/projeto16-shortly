import { Router } from 'express';

//Auth
import { validateSignUp, checkEmailAlreadyExists, validateSignIn, checkEmailPassword } from '../middlewares/authMiddlewares.js';
import { signUp, signIn } from '../controllers/authControllers.js';

//User


const router = Router();

//Auth
router.post('/signup', validateSignUp, checkEmailAlreadyExists, signUp);
router.post('/signin', validateSignIn, checkEmailPassword, signIn);

//User


export default router;