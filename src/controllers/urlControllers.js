import { nanoid } from 'nanoid';
import { insertUrl, insertUrlUser, queryIdGetUrl, queryUrlId, queryUrlIdGetUrl, queryVCGetUrlId, queryUpdateUrlStats, queryUserIdGetUrlId, queryDeleteUrlUser, queryDeleteUrl } from '../reposityory/urlQueries.js';
export const NANOID_PARAM = 10;

//Basics
export const postShortUrl = async (req, res) => {
  const { url } = res.locals;
  const { userId } = res.locals;

  const shortUrl = nanoid(NANOID_PARAM);
  const urlObj = { url, shortUrl};

  try {
    await insertUrl(urlObj);
    const urlId = await actuallyGetUrlId(shortUrl);
    await actuallyInsertUrlUser(urlId, userId);
    res.status(201).json({ status: 201, message: shortUrl });
  } catch (error) {
    res.status(500).json({ status: 500, message: `Internal system error.\n More details: ${error.message}` });
  }
};

export const getShortUrl = async (req, res) => {
  const { response } = res.locals;
  res.status(200).json({ status: 200, message: response });
};

export const getShortUrlStats = async (req, res) => {
  const { shortUrl } = res.locals;

  try {
  const { visitCount, url } = await actuallyGetUrlStats(shortUrl);
  const addVisitCount = visitCount + 1;
  await actuallyUpdateUrlStats(addVisitCount, shortUrl);
  res.redirect(url);
  } catch (error) {
    res.status(500).json({ status: 500, message: `Internal system error.\n More details: ${error.message}` });
  }
};

export const deleteUrl = async (req, res) => {
  const { urlId } = res.locals;

  try {
    await actuallyDeleteUrlUser(urlId);
    await actuallyDeleteUrl(urlId);
    res.status(204).json({ status: 204, message: 'Url deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 500, message: `Internal system error.\n More details: ${error.message}` });
  }
};

//Middlewares
export const actuallyGetUrlById = async (id) => {
  const { rows: url } = await connection.query(queryIdGetUrl, [id]);
  if (url && url.length > 0) return url[0].url;
  return false;
};

export const actuallyGetUrlIdByUrl = async (shortUrl) => {
  const { rows: id } = await connection.query(queryUrlIdGetUrl, [shortUrl]);
  if (url && url.length > 0) return url[0].id;
  return false;
};

export const actuallyGetUserIdByUrlIdAndTokenId = async (urlId, userTokenId) => {
  const { rows: userId } = await connection.query(queryUserIdGetUrlId, [urlId, userTokenId]);
  if (userId && userId.length > 0) return userId[0].userId;
  return false;
};


//Actual execution of HTTP Methods
export const actuallyGetUrlId = async (shortUrl) => {
  const { rows: id } = await connection.query(queryUrlId, [shortUrl]);
  if (id && id.length > 0) return id[0].id;
  return false;
};

export const actuallyInsertUrlUser = async (urlId, userId) => {
  const insert = await connection.query(insertUrlUser, [urlId, userId]);
  if (insert) return true;
  return false;
};

export const actuallyGetUrlStats = async (shortUrl) => {
  const { rows: n } = await connection.query(queryVCGetUrlId, [shortUrl]);
  if (n && n.length > 0) return sum[0];
  return false;
};

export const actuallyUpdateUrlStats = async (addVisitCount, shortUrl) => {
  const update = await connection.query(queryUpdateUrlStats, [addVisitCount, shortUrl]);
  return update;
};

export const actuallyDeleteUrlUser = async (urlId) => {
  const deleteUrlUser = await connection.query(queryDeleteUrlUser, [urlId]);
  return deleteUrlUser;
};

export const actuallyDeleteUrl = async (urlId) => {
  const deleteUrl = await connection.query(queryDeleteUrl, [urlId]);
  return deleteUrl;
};