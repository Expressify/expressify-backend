import express from "express";
import {
  getAllUserController,
  getOneUserController,
  createOneUserController,
  updateOneUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUserController);
router.get("/:id", getOneUserController);
router.post("/", createOneUserController);
router.patch("/:id", updateOneUserController);

export default router;
