import { query } from "../utils/db.utils.js";

const getAll = async () => {
  const data = await query(`SELECT * FROM user`);
  return data[0];
};

export { getAll };
