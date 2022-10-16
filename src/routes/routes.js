import { Router } from 'express';

//Auth
import { validateSignUp, checkEmailAlreadyExists, validateSignIn, checkEmailPassword } from '../middlewares/authMiddlewares.js';
import { signUp, signIn } from '../controllers/authControllers.js';

//Url
import { validateUrl, validateHeaderModel, validateToken, validateId, validateParams, validateShortUrl, validateExistence, validateTokenUser } from '../middlewares/urlMiddlewares.js';
import { postShortUrl, getShortUrl, getShortUrlStats, deleteUrl } from '../controllers/urlControllers.js';

const router = Router();

//Auth
router.post('/signup', validateSignUp, checkEmailAlreadyExists, signUp);
router.post('/signin', validateSignIn, checkEmailPassword, signIn);

//Url
router.post('/urls/shorten', validateUrl, validateHeaderModel, validateToken, postShortUrl);
router.get('/urls/:shortUrl', validateId, validateParams, getShortUrl);
router.get('/urls/open/:shortUrl', validateShortUrl, validateExistence, getShortUrlStats);
router.delete('/urls/:id', validateId, validateHeaderModel, validateToken, validateParams, validateTokenUser, deleteUrl);


export default router;