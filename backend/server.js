import express from "express";
import colors from "colors";

import { connectDB } from "./config/db.js";

import { notFound, errorHandler } from "./middleware/error.js";

import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import productRoutes from "./routes/product.js";

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => res.send("API is running..."));
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on porn ${PORT}`.yellow.bold
  )
);
