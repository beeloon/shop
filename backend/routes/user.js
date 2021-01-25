import express from "express";

import {
  authUser,
  getUsers,
  deleteUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.js";

import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/").get(protect, admin, getUsers);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser);

export default router;
