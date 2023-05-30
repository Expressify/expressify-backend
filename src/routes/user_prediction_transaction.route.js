import express from "express";
import {
  createOneUserPredictionTransactionController,
  getAllUserPredictionTransactionController,
  getOneUserPredictionTransactionController,
  updateOneUserPredictionTransactionController,
} from "../controllers/user_prediction_transaction.controller.js";

const router = express.Router();

router.get("/", getAllUserPredictionTransactionController);
router.get("/:id", getOneUserPredictionTransactionController);
router.post("/", createOneUserPredictionTransactionController);
router.patch("/:id", updateOneUserPredictionTransactionController);

export default router;
