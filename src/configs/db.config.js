import mysql from "promise-mysql";
import * as dotenv from "dotenv";

dotenv.config();

var createPool;
if (process.env.NODE_ENV === "development") {
  createPool = async () => {
    return await mysql.createPool({
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
    });
  };
} else if (process.env.NODE_ENV === "production") {
  createPool = async () => {
    return await mysql.createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      socketPath: process.env.INSTANCE_UNIX_SOCKET,
    });
  };
}

export default createPool;
