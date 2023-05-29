import express from "express";
import {
  createOneUserProfilePhotoController,
  getAllUserProfilePhotoController,
  getOneUserProfilePhotoController,
  updateOneUserProfilePhotoController,
} from "../controllers/user_profile_photo.controller.js";

const router = express.Router();

router.get("/", getAllUserProfilePhotoController);
router.get("/:id", getOneUserProfilePhotoController);
router.post("/", createOneUserProfilePhotoController);
router.patch("/:id", updateOneUserProfilePhotoController);

export default router;
