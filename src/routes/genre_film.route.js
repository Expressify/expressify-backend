import express from "express";
import {
  createOneGenreFilmController,
  getAllGenreFilmController,
  getOneGenreFilmController,
  updateOneGenreFilmController,
} from "../controllers/genre_film.controller.js";

const router = express.Router();

router.get("/", getAllGenreFilmController);
router.get("/:id", getOneGenreFilmController);
router.post("/", createOneGenreFilmController);
router.patch("/:id", updateOneGenreFilmController);

export default router;
