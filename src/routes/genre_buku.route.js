import express from "express";
import {
  createOneGenreBukuController,
  getAllGenreBukuController,
  getOneGenreBukuController,
  updateOneGenreBukuController,
} from "../controllers/genre_buku.controller.js";

const router = express.Router();

router.get("/", getAllGenreBukuController);
router.get("/:id", getOneGenreBukuController);
router.post("/", createOneGenreBukuController);
router.patch("/:id", updateOneGenreBukuController);

export default router;
