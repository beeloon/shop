import express from "express";
import colors from "colors";

import { connectDB } from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/product.js";
import userRoutes from "./routes/user.js";

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on porn ${PORT}`.yellow.bold
  )
);
