import asyncHandler from "express-async-handler";

import { generateToken } from "../utils/generateToken.js";
import { throwError } from "../utils/throwError.js";

import { User } from "../models/User.js";

// @desc    Auth user and get token
// @route   POST api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else throwError(res.status(401), "Invalid email or password");
});

// @desc    Get user profile
// @route   GET api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else throwError(res.status(404), "Invalid user data");
});

// @desc    Register a new user
// @route   POST api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) throwError(res.status(400), "User Already exists");

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else throwError(res.status(404), "Invalid user data");
});
