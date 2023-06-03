const Cart = require("../models/Cart");



const createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    if (await Cart.findOne({ userId: newCart.userId })) {
      res.status(400).json("Cart already exists");
    }
    else {
      const savedCart = await newCart.save();
      res.status(200).json("Cart created successfully");
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      { $set: { products: req.body.products } },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {createCart, updateCart, deleteCart, getCart, getCarts};