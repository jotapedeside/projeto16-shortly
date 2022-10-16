export const queryGetRanking = async () => {
  const query = `SELECT users."id", users."name", COALESCE(COUNT(urls."visitCount")::int, 0) AS "linksCount",
  COALESCE(SUM(urls."visitCount")::int, 0) AS "visitCount"
  FROM "users" LEFT JOIN "urlsUsers" ON "users"."id" = "urlsUsers"."userid"
  LEFT JOIN "urls" ON "urls"."id" = "urlsUsers"."urlId"
  GROUP BY users."id" ORDER BY "visitCount" DESC, "linksCount" DESC LIMIT 10;`;
  return query;
};