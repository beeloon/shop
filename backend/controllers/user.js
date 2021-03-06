import { asyncHandler as ash } from "../middleware/async.js";

import { generateToken } from "../utils/generateToken.js";
import { throwError } from "../utils/throwError.js";

import { User } from "../models/User.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = ash(async (req, res) => {
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

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
export const authUser = ash(async (req, res) => {
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
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = ash(async (req, res) => {
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

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = ash(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else throwError(res.status(404), "User Not Found");
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = ash(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = ash(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else throwError(res.status(404), "User not found");
});

// @desc    Get user by id
// @route   GET /api/users:id
// @access  Private/Admin
export const getUserById = ash(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) res.json(user);
  else throwError(res.status(404), "User not found");
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = ash(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else throwError(res.status(404), "User Not Found");
});
