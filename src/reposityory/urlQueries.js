export const insertUrl = async () => {
  const query = `INSERT INTO "urls" ("url", "shortUrl") VALUES ($1, $2);`;
  return query;
};

export const insertUrlUser = async () => {
  const query = `INSERT INTO "urlUser" ("urlId", "userId") VALUES ($1, $2);`;
  return query;
};

export const queryIdGetUrl = async () => {
  const query = `SELECT "id", "url", "shortUrl" FROM "urls" WHERE "id" = $1;`;
  return query;
};

export const queryUrlId = async () => {
  const query = `SELECT "id" FROM "urls" WHERE "shortUrl" = $1;`;
  return query;
};

export const queryUrlIdGetUrl = async () => {
  const query = `SELECT "id" FROM "urls" WHERE "url" = $1;`;
  return query;
};

export const queryVCGetUrlId = async () => {
  const query = `SELECT "visitCount", "url" FROM "urls" WHERE "shortUrl" = $1;`;
  return query;
};

export const queryUpdateUrlStats = async () => {
  const query = `UPDATE "urls" SET "visitCount" = $1 WHERE "shortUrl" = $2;`;
  return query;
};

export const queryUserIdGetUrlId = async () => {
  const query = `SELECT "urlsUsers"."userid" as "userId" FROM urls JOIN "urlsUsers" 
  ON "urlsUsers"."urlId" = $1 WHERE "urlsUsers"."userid" = $2 LIMIT 1;`;
  return query;
};

export const queryDeleteUrlUser = async () => {
  const query = `DELETE FROM "urlsUsers" WHERE "urlId" = $1;`;
  return query;
};

export const queryDeleteUrl = async () => {
  const query = `DELETE FROM "urls" WHERE "id" = $1;`;
  return query;
};