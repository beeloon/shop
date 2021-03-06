import { asyncHandler as ash } from "../middleware/async.js";

import { Product } from "../models/Product.js";

import { throwError } from "../utils/throwError.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = ash(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = ash(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) res.json(product);
  else throwError(res.status(404), "Product not found");
});

// @desc    Delete product
// @route   Delete /api/products/:id
// @access  Public/Admin
export const deleteProduct = ash(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else throwError(res.status(404), "Product not found");
});

// @desc    Create a product
// @route   POST /api/products
// @access  Public/Admin
export const createProduct = ash(async (req, res) => {
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
// @route   PUT /api/products/:id
// @access  Privete/Admin
export const updateProduct = ash(async (req, res) => {
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

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Privete
export const createProductReview = ash(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const { reviews } = product;
    const alreadyReviewed = reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      throwError(res.status(400), "Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    reviews.push(review);

    product.numReviews = reviews.length;

    const totalReviews = reviews.reduce((acc, item) => item.rating + acc, 0);
    product.rating = totalReviews / reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    throwError(res.send(404), "Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = ash(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});
