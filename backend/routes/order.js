import express from "express";

import { addOrderItems } from "../controllers/order.js";

import { protect } from "../middleware/auth";

const router = express.Router();

router.route("/").post(protect, getProducts);

export default router;
