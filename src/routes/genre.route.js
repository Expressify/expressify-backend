import express from "express";
import {
  createOneGenreController,
  getAllGenreController,
  getOneGenreController,
  updateOneGenreController,
} from "../controllers/genre.controller.js";

const router = express.Router();

router.get("/", getAllGenreController);
router.get("/:id", getOneGenreController);
router.post("/", createOneGenreController);
router.patch("/:id", updateOneGenreController);

export default router;
