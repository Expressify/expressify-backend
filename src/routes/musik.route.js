import express from "express";
import {
  createOneMusikController,
  getAllMusikController,
  getOneMusikController,
  updateOneMusikController,
} from "../controllers/musik.controller.js";

const router = express.Router();

router.get("/", getAllMusikController);
router.get("/:id", getOneMusikController);
router.post("/", createOneMusikController);
router.patch("/:id", updateOneMusikController);

export default router;
