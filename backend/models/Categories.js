const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    cat: {
      type: String,
      unique: true,
      required: "Category name is required!",
    },
    img: {
      type: String,
      required: true,
      max: 255,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", CategoriesSchema);
