import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { User } from "../models/User.js";

import { throwError } from "../utils/throwError.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer")) {
    try {
      token = header.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      throwError(res.status(401), "Not authorized, token failed");
    }
  }

  if (!token) throwError(res.status(401), "Not authorized, no token");
});
