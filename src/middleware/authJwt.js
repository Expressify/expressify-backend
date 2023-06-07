import jwt from "jsonwebtoken";
import { jwtAccessSecret } from "../configs/auth.config.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(400).json({
      message: `Access token tidak ada`,
      status: false,
    });
  }
  token = token.split(" ")[1];
  jwt.verify(token, jwtAccessSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        message: `error, ${err.message}`,
        status: false,
      });
    }
    req.user = decoded;
    next();
  });
};

export default {
  verifyToken,
};
