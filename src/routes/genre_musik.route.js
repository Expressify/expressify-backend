import express from "express";
import {
  createOneGenreMusikController,
  getAllGenreMusikController,
  getOneGenreMusikController,
  updateOneGenreMusikController,
} from "../controllers/genre_musik.controller.js";

const router = express.Router();

router.get("/", getAllGenreMusikController);
router.get("/:id", getOneGenreMusikController);
router.post("/", createOneGenreMusikController);
router.patch("/:id", updateOneGenreMusikController);

export default router;
