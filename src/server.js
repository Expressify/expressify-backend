import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import genreRoutes from "./routes/genre.route.js";
import filmRoutes from "./routes/film.route.js";
import genreMusikRoutes from "./routes/genre_musik.route.js";
import bukuRoutes from "./routes/buku.route.js";
import musikRoutes from "./routes/musik.route.js";
import userGenreRoutes from "./routes/user_genre.route.js";
import genreFilmRoutes from "./routes/genre_film.route.js";
import genreBukuRoutes from "./routes/genre_buku.route.js";
import userJurnalRoutes from "./routes/user_jurnal.route.js";
import articleRoutes from "./routes/artikel.route.js";
import userPredictionTransactionRoutes from "./routes/user_prediction_transaction.route.js";
import authJwt from "./middleware/authJwt.js";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import multer from "multer";

dotenv.config();
const app = express();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.use(multerMid.single("file"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Successful Response");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/genres", genreRoutes);
app.use(authJwt.verifyToken); // token authentication

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/films", filmRoutes);
app.use("/api/v1/genre_musics", genreMusikRoutes);
app.use("/api/v1/books", bukuRoutes);
app.use("/api/v1/musik", musikRoutes);
app.use("/api/v1/user_genres", userGenreRoutes);
app.use("/api/v1/genre_films", genreFilmRoutes);
app.use("/api/v1/genre_books", genreBukuRoutes);
app.use("/api/v1/user_jurnals", userJurnalRoutes);
app.use("/api/v1/articles", articleRoutes);
app.use(
  "/api/v1/user_prediction_transactions",
  userPredictionTransactionRoutes
);

const startServer = () => {
  const PORT = process.env.PORT || 8080;
  try {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.error(`Failed to start server`, err.message);
  }
};

startServer();
