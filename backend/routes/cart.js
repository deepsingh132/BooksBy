const { createCart, updateCart, getCart, getCarts, deleteCart } = require("../controllers/cart");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");
const router = require("express").Router();

//CREATE

router.post("/:id", verifyTokenAndAuth, createCart);

//UPDATE
router.put("/:id", verifyTokenAndAuth, updateCart);

//DELETE
router.delete("/:id", verifyTokenAndAuth, deleteCart);

//GET USER CART
router.get("/find/:id", verifyTokenAndAuth, getCart);

// //GET ALL

router.get("/", verifyTokenAndAdmin, getCarts);

module.exports = router;
