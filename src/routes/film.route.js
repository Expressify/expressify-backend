import express from "express";
import {
  createOneFilmController,
  getAllFilmController,
  getOneFilmController,
  updateOneFilmController,
} from "../controllers/film.controller.js";

const router = express.Router();

router.get("/", getAllFilmController);
router.get("/:id", getOneFilmController);
router.post("/", createOneFilmController);
router.patch("/:id", updateOneFilmController);

export default router;
