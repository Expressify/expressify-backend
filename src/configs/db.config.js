import mysql from "promise-mysql";
import * as dotenv from "dotenv";

dotenv.config();

const createTcpPool = async () => {
  return await mysql.createPool({
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  });
};

export default createTcpPool;
