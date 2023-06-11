import createPool from "../configs/db.config.js";

async function query(sql, params) {
  const pool = await createPool();
  const data = await pool.query(sql, params);
  pool.end();
  return data;
}

export { query };
