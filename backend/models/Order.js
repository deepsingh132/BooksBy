const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: {type: String, required: true},
    id: { type: String, required: true, unique: true},
    products: [
      {
        productId: {
          type: String,
        },
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
        img: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    phone: { type: String, required: true },
    shippingFee: { type: Number, required: true },
    shippingMethod: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    link: { type: String, required: true },
    pdf: { type: String, required: true },
    time: {type: String, required: true},
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
