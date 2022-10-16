import { queryUserUrls } from '../reposityory/userQueries.js';

//Basics
export const getUserLinks = async (req, res) => {
  const { userId } = res.locals;
  
  try {
    const data = await actuallyGetUserUrlsById(userId);
    if (!data) return res.status(404).json({ status: 404, message: 'User not found' });
    res.status(200).json({ status: 200, message: data });
  } catch (error) {
    res.status(500).json({ status: 500, message: `Internal system error.\n More details: ${error.message}` });
  }
};

export const actuallyGetUserUrlsById = async (id) => {
  const { rows: data } = await connection.query(queryUserUrls, [id]);
  if (data && data.length > 0) return data;
  return false;
};

