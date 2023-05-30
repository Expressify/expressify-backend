import express from "express";
import {
  createOneArticleController,
  getAllArticleController,
  getOneArticleController,
  updateOneArticleController,
} from "../controllers/artikel.controller.js";

const router = express.Router();

router.get("/", getAllArticleController);
router.get("/:id", getOneArticleController);
router.post("/", createOneArticleController);
router.patch("/:id", updateOneArticleController);

export default router;
