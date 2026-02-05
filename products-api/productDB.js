require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Products.js");
const connectDB = require("./db/connect.js");
const ProductJson = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Product.deleteMany();
    await Product.create(ProductJson);
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};

start();
