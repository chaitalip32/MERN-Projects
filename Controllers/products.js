const Product = require("../models/Products.js");

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (featured) {
    queryObject.featured = featured === "true";
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    const sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    const selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  const Products = await apiData;

  res.status(200).json({ Products, nbHits: Products.length });
};

const getAllProductsTesting = async (req, res) => {
  console.log(req.query);
  const Products = await Product.find(req.query);
  res.status(200).json({ Products });
};

module.exports = { getAllProducts, getAllProductsTesting };
