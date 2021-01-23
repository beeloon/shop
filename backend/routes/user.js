import express from "express";

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/user.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);

export default router;
