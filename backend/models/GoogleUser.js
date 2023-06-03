const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema(
  {
    profileId: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: "Your email is required",
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: "Your username is required",
    },
    name: {
      type: String,
      required: "Your name is required",
      max: 100,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      required: true,
      max: 255,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GoogleUsers", GoogleUserSchema);
