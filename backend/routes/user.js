import express from "express";

import {
  authUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.js";

import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
