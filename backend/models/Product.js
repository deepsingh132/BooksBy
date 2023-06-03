const mongoose = require("mongoose");

const Book = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    institutions: { type: Array, ref: "Institution" },
    // institutions: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    rating: { type: Number },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", Book);