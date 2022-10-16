import joi from 'joi';

export const urlSchema = joi.object({
  url: joi.string().required().pattern( /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/)
});

export const tokenSchema = joi.object({
  //authorization: joi.string().required().pattern(/^Bearer\s[a-zA-Z0-9-._~+/]+=*$/)
  authorization: joi.string().required().pattern(/^Bearer .+$/)
});