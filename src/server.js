import express from "express";
import userRoutes from "./routes/user.route.js";
import genreRoutes from "./routes/genre.route.js";
import filmRoutes from "./routes/film.route.js";
import genreBukuRoutes from "./routes/genre_buku.route.js";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Successful Response");
});
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genres", genreRoutes);
app.use("/api/v1/films", filmRoutes);
app.use("/api/v1/genre_books", genreBukuRoutes);

const startServer = () => {
  const PORT = process.env.PORT || 8080;
  try {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.error(`Failed to start server`, err.message);
  }
};

startServer();
