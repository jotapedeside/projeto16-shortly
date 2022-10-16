
export const queryUserUrls = () => {
  const query = `SELECT "users"."id", "users"."name", COALESCE(SUM(urls."visitCount")::int, 0)AS "visitCount",
  CASE WHEN COUNT(urls."url") > 0 THEN json_agg(json_build_object('id',"urls"."id",'shortUrl',"urls"."shortUrl",'url',"urls"."url",'visitCount',"urls"."visitCount"))
  ELSE '[]' END AS "shortenedUrls"
  FROM "users" LEFT JOIN "urlsUsers" ON "urlsUsers"."userid" = "users"."id" left JOIN urls ON "urlsUsers"."urlId" = "urls"."id"
  WHERE users.id = $1 GROUP BY "users"."id" ORDER BY "visitCount" DESC;`;
  return query;
};