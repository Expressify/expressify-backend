import createPool from "../configs/db.config.js";

async function query(sql, params) {
  const pool = await createPool();
  const data = await pool.query(sql, params);
  return data;
}

export { query };
