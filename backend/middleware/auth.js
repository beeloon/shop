import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { User } from "../models/User.js";

import { throwError } from "../utils/throwError.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      throwError(res.status(401), "Not authorized, token failed");
    }
  }

  if (!token) throwError(res.status(401), "Not authorized, no token");
});
