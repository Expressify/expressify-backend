import express from "express";
import {
  createOneUserGenreController,
  getAllUserGenreController,
  getOneUserGenreController,
  updateOneUserGenreController,
} from "../controllers/user_genre.controller.js";

const router = express.Router();

router.get("/", getAllUserGenreController);
router.get("/:id", getOneUserGenreController);
router.post("/", createOneUserGenreController);
router.patch("/:id", updateOneUserGenreController);

export default router;
