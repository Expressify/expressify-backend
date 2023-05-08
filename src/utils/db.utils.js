import createTcpPool from "../configs/db.config.js";

async function query(sql, params) {
  const pool = await createTcpPool();
  const data = await pool.query(sql, params);
  return data;
}

export { query };
