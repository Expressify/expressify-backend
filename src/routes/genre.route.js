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
import authJwt from "../middleware/authJwt.js";

const router = express.Router();

router.get("/", getAllGenreController);
router.get("/:id", getOneGenreController);
router.get("/:id/books", authJwt.verifyToken, getBukuByGenreIdController);
router.get("/:id/films", authJwt.verifyToken, getFilmByGenreIdController);
router.get("/:id/musics", authJwt.verifyToken, getMusikByGenreIdController);
router.post("/", authJwt.verifyToken, createOneGenreController);
router.patch("/:id", authJwt.verifyToken, updateOneGenreController);

export default router;
