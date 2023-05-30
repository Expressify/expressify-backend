import express from "express";
import {
  createOneGenreController,
  getAllGenreController,
  getOneGenreController,
  getBukuByGenreIdController,
  getFilmByGenreIdController,
  getMusikByGenreIdController,
  updateOneGenreController,
} from "../controllers/genre.controller.js";

const router = express.Router();

router.get("/", getAllGenreController);
router.get("/:id", getOneGenreController);
router.get("/:id/books", getBukuByGenreIdController);
router.get("/:id/films", getFilmByGenreIdController);
router.get("/:id/musics", getMusikByGenreIdController);
router.post("/", createOneGenreController);
router.patch("/:id", updateOneGenreController);

export default router;
