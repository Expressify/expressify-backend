import express from "express";
import userRoutes from "./routes/user.route.js";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Successful Response");
});
app.use("/api/v1/users", userRoutes);

const startServer = () => {
  const PORT = process.env.PORT || 8080;
  try {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.error(`Failed to start server`, err.message);
  }
};

startServer();
