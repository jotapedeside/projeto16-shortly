import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { NANOID_PARAM } from '../controllers/urlControllers.js';
import { urlSchema, tokenSchema } from '../models/urlModel.js';
import { actuallyGetUrlById, actuallyGetUrlIdByUrl } from '../controllers/urlControllers.js';

dotenv.config();

export const validateUrl = async (req, res, next) => {
  const urlValidation = urlSchema.validate(req.body, { abortEarly: false });

  if (urlValidation.error) {
    const erros = urlValidation.error.details.map((error) => error.message);
    return res.status(422).json({ status: 422, message: erros });
  }

  const url = {
    url: urlValidation.value.url
  };

  res.locals.url = url;
  next();
  return true;
};

export const validateHeaderModel = async (req, res, next) => {
  const tokenValidation = tokenSchema.validate(req.headers, { abortEarly: false });

  if (tokenValidation.error) {
    const erros = tokenValidation.error.details.map((error) => error.message);
    return res.status(422).json({ status: 422, message: erros });
  }

  const token = tokenValidation.value.authorization.split(' ')[1];

  res.locals.token = token;
  next();
  return true;
};

export const validateToken = async (req, res, next) => {
  const { token } = res.locals;
  const { JWT_SECRET } = process.env;

  try {
    const { userId } = jwt.verify(token, JWT_SECRET);

    /*if (!id) {
      return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }*/

    res.locals.userId = userId;
    next();
    return true;
  } catch (error) {
    res.status(404).json({ status: 404, message: `Invalid token\n More details: ${error.message}` });
  }
};

export const validateId = async (req, res, next) => {
  //const { id } = req.params.id;
  const { id } = Number(req.params.id);
  const isNan = Number.isNaN(id);
  const isNum = Number.isInteger(id);

  if (isNan || !isNum) {
    return res.status(422).json({ status: 422, message: 'Id is not a number' });
  }

  res.locals.urlId = id;
  next();
  return true;
};

export const validateParams = async (req, res, next) => {
  const { urlId } = res.locals;
  try {
    const response = await actuallyGetUrlById(urlId);
    if (!response) return res.status(404).json({ status: 404, message: 'Id does not belong to any url' });
    res.locals.response = response;
  } catch (error) {
    res.status(404).json({ status: 404, message: `Invalid id\n More details: ${error.message}` });
  }
};

export const validateShortUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  const invalidSize = shortUrl.length !== NANOID_PARAM;

  if (invalidSize) return res.status(422).json({ status: 422, message: 'Invalid short url' });

  res.locals.shortUrl = shortUrl;
  next();
  return true;
};

export const validateExistence = async (req, res, next) => {
  const { shortUrl } = res.locals;

  try {
    const idExists = await actuallyGetUrlIdByUrl(shortUrl);
    if (!idExists) return res.status(404).json({ status: 404, message: 'Short url does not exist' });
  } catch (error) {
    res.status(500).json({ status: 500, message: `Invalid short url\n More details: ${error.message}` });
  }
  next();
  return true;
};

export const validateTokenUser = async (req, res, next) => {
  const userTokenId = res.locals.userId;
  const { urlId } = res.locals;

  try {
    const tokenValidation = await actuallyGetUserIdByUrlIdAndTokenId(urlId, userTokenId);
    if (!tokenValidation) return res.status(401).json({ status: 401, message: 'Unauthorized' });
  } catch (error) {
    res.status(500).json({ status: 500, message: `Invalid user\n More details: ${error.message}` });
  }
  next();
  return true;
};
