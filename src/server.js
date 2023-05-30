import express from "express";
import userRoutes from "./routes/user.route.js";
import genreRoutes from "./routes/genre.route.js";
import filmRoutes from "./routes/film.route.js";
import genreMusikRoutes from "./routes/genre_musik.route.js";
import bukuRoutes from "./routes/buku.route.js";
import musikRoutes from "./routes/musik.route.js";
import userGenreRoutes from "./routes/user_genre.route.js";
import genreFilmRoutes from "./routes/genre_film.route.js";
import genreBukuRoutes from "./routes/genre_buku.route.js";
import userProfilePhotoRoutes from "./routes/user_profile_photo.route.js";
import userJurnalRoutes from "./routes/user_jurnal.route.js";
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
app.use("/api/v1/genre_musics", genreMusikRoutes);
app.use("/api/v1/books", bukuRoutes);
app.use("/api/v1/musik", musikRoutes);
app.use("/api/v1/user_genres", userGenreRoutes);
app.use("/api/v1/genre_films", genreFilmRoutes);
app.use("/api/v1/genre_books", genreBukuRoutes);
app.use("/api/v1/user_profile_photos", userProfilePhotoRoutes);
app.use("/api/v1/user_jurnals", userJurnalRoutes);

const startServer = () => {
  const PORT = process.env.PORT || 8080;
  try {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (err) {
    console.error(`Failed to start server`, err.message);
  }
};

startServer();
