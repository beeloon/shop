import express from "express";
import colors from "colors";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";

const PORT = process.env.PORT;
const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on porn ${PORT}`.yellow.bold
  )
);
