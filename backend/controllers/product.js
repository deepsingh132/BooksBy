const Institution = require("../models/Institution");
const Product = require("../models/Product");
const Categories = require("../models/Categories");
const Slider = require("../models/Slider");

const createProduct = async (req, res) => {
  const productId = req.body.id;

  try {
    // Check if product with given ID already exists
    const productExists = await Product.findOne({ id: productId });

    if (productExists) {
      // If product exists, return an error message and stop execution
      return res
        .status(400)
        .json({ error: "Product with given ID already exists" });
    }

    // If product doesn't exist, create a new product and save to the database
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  let productIds = req.query.ids; //.split(",");
  if (productIds) {
    productIds = productIds.split(",");
  }

  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else if (productIds) {
      products = await Product.find({
        _id: {
          $in: productIds,
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSlider = async (req, res) => {
  try {
    const slider = await Slider.find();
    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json(error);
  }
};

const autoComplete = async (req, res) => {
  try {
    let result = await Product.aggregate([
      {
        $search: {
          autocomplete: {
            query: `${req.query.q}`,
            path: "title",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
    ]);
    res.send(result);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const searchController = async (req, res) => {
  const query = req.query.q;
  try {
    let books;
    let institutions;
    // Search for books that match the search term
    books = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { categories: { $regex: query, $options: "i" } },
      ],
    });
    // Search for institutions that match the search term
    institutions = await Institution.find({
      name: { $regex: query, $options: "i" },
    }).populate("books");

    // Display institution data only if the search term matches an institution name
    if (institutions.length > 0) {
      res.status(200).json({ institutions, books });
    } else {
      res.status(200).json({ books });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getSlider,
  getCategories,
  searchController,
  autoComplete,
};
