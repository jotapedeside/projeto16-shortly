export const queryEmailGetEmail = () => {
  return `SELECT email FROM users WHERE email = $1`;
};

export const queryInsertUser = () => {
  return `INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3)`;
};

export const queryUserGetEmail = () => {
  return `SELECT * FROM users WHERE email = $1`;
};

export const queryEmailGetPassword = () => {
  return `SELECT password FROM users WHERE email = $1`;
};