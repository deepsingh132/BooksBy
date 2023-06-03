
const { createOrder, updateOrder, deleteOrder, getOrders, getAllOrders, getIncome } = require("../controllers/order");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//GET USER ORDERS
router.get("/find/:id", verifyTokenAndAuth, getOrders);

//GET ALL Orders

router.get("/", verifyTokenAndAdmin, getAllOrders);

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, getIncome);

module.exports = router;
