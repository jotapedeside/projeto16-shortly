import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { queryEmailGetEmail, queryInsertUser, queryUserGetEmail, queryEmailGetPassword } from './queries';


dotenv.config();
const EXPIRE_TIME = 24*60*60; // 24 hours
const jwtExpire = { expiresIn: EXPIRE_TIME };


//Middleware Checks
export const actuallyCheckIfEmailAlreadyExists = async (email) => {
  const { rows: user } = await connection.query(queryEmailGetEmail, [email]);
};

export const actuallyInsertUser = async (user) => {
  await connection.query(queryInsertUser, [user.name, user.email, user.password]);
};

export const actuallyCheckUser = async (email) => {
  const { rows: user } = await connection.query(queryUserGetEmail, [email]);
  return user;
};

export const actuallyCheckPassword = async (email) => {
  const user = await connection.query(queryEmailGetPassword, [email]);
  return user[0].password;
};


//Actual execution of HTTP Methods
export const signUp = async (req, res) => {
  const { name, email, password } = res.locals.signUpInfo;
  const hash = await bcrypt.hash(password, 10);
  const user = { name, email, password: hash };

  try {
    await actuallyInsertUser(user);
    res.status(201).json({ status: 201, message: 'User registered' });
  } catch (error) {
    res.status(500).json({ status: 500, message: `Internal system error.\n More details: ${error.message}` });
  }
};

export const signIn = async (req, res) => {
  const { email } = res.locals.user;

  try {
    const user = await actuallyCheckUser(email);
    const { id: userId } = user;
    const data = { userId };
    const { JWT_SECRET } = process.env;
    const token = jwt.sign(data, JWT_SECRET, jwtExpire);
    res.status(200).json({ status: 200, message: 'User logged in', token });
  } catch (error) {
    res.status(500).json({ status: 500, message: `Internal system error.\n More details: ${error.message}` });
  }
};