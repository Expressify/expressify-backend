import express from "express";
import {
  createOneBukuController,
  getAllBukuController,
  getOneBukuController,
  updateOneBukuController,
} from "../controllers/buku.controller.js";

const router = express.Router();

router.get("/", getAllBukuController);
router.get("/:id", getOneBukuController);
router.post("/", createOneBukuController);
router.patch("/:id", updateOneBukuController);

export default router;
