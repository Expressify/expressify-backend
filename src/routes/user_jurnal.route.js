import express from "express";
import {
  createOneUserJurnalController,
  getAllUserJurnalController,
  getOneUserJurnalController,
  updateOneUserJurnalController,
} from "../controllers/user_jurnal.controller.js";

const router = express.Router();

router.get("/", getAllUserJurnalController);
router.get("/:id", getOneUserJurnalController);
router.post("/", createOneUserJurnalController);
router.patch("/:id", updateOneUserJurnalController);

export default router;
