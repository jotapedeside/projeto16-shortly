import { queryGetRanking } from '../reposityory/rankingQueries.js';

//Basics
export const getRanking = async (req, res) => {
  try {
    const ranking = await actuallyGetRanking();
    if (!ranking) return res.status(404).json({ status: 404, message: 'Ranking not found' });
    res.status(200).json({ status: 200, message: ranking });
  } catch (error) {
    res.status(500).json({ status: 500, message: `Internal system error.\n More details: ${error.message}` });
  }
};

//Actual execution of HTTP Methods
export const actuallyGetRanking = async () => {
  const { rows: ranking } = await connection.query(queryGetRanking);
  if (ranking && ranking.length > 0) return ranking;
  return false;
}