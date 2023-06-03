const { createProduct, updateProduct, deleteProduct, getProduct, getProducts, searchController, getCategories, autoComplete, getSlider } = require("../controllers/product");

const {
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, createProduct);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//GET PRODUCT
router.get("/book/:id", getProduct);

//GET ALL PRODUCTS
router.get("/", getProducts);

// GET ALL SLIDER PRODUCTS
router.get("/slider", getSlider);

//GET CATEGORIES
router.get("/categories", getCategories);


router.get("/search", searchController)

router.get("/search/autocomplete", autoComplete)

module.exports = router;
