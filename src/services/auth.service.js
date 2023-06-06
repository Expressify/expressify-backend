import { query } from "../utils/db.utils.js";

const getOneByEmail = async (email) => {
  const data = await query(`SELECT * FROM user WHERE email = ?`, [email]);
  return data[0];
};

export { getOneByEmail };
