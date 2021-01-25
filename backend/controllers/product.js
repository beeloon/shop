import asyncHandler from "express-async-handler";

import { Product } from "../models/Product.js";

import { throwError } from "../utils/throwError.js";

// @desc    Fetch all products
// @route   GET api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc    Fetch single product
// @route   GET api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) res.json(product);
  else throwError(res.status(404), "Product not found");
});

// @desc    Delete product
// @route   Delete api/products/:id
// @access  Public/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else throwError(res.status(404), "Product not found");
});

// @desc    Create a product
// @route   POST api/products
// @access  Public/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/airpods.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    description: "Sample description",
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

// @desc    Update a product
// @route   PUT api/products/:id
// @access  Public/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    user,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.user = user;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    throwError(res.send(404), "Product not found");
  }
});
