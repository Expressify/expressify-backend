import express from "express";
import {
  getAllUserController,
  getOneUserController,
  getGenreByUserIdController,
  getUserJurnalByUserIdController,
  getPredictionByUserIdController,
  createOneUserController,
  updateOneUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUserController);
router.get("/:id/genres", getGenreByUserIdController);
router.get("/:id/user_jurnals", getUserJurnalByUserIdController);
router.get(
  "/:id/user_prediction_transactions",
  getPredictionByUserIdController
);
router.get("/:id", getOneUserController);
router.post("/", createOneUserController);
router.patch("/:id", updateOneUserController);

export default router;
