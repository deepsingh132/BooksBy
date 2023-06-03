const mongoose = require("mongoose");

const Institution = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    courses: {
      type: Object,
      default: {},
    },
    type: {
      type: String,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true },
  { toJSON: { virtuals: true } }
);

Institution.virtual('totalBooks').get(function () {
  return this.books ? this.books.length : 0;
});

module.exports = mongoose.model("Institution", Institution);
