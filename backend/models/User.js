const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Token = require("./Token");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: "Your email is required",
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: "Your name is required",
      max: 100,
    },
    username: {
      type: String,
      unique: true,
      required: "Your username is required",
    },
    password: {
      type: String,
      required: "Your password is required",
      max: 128,
    },
    address: {
      type: String,
      max: 255,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      required: false,
      max: 255,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: {
      type: String,
      required: false,
    },

    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  const password = update.$set.password;
  if (!update.$set || !update.$set.password) {
    return next();
  } // Skip if password is not being updated
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      update.$set.password = hash;
      next();
    });
  });
});



UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  let payload = {
    id: this._id,
    isAdmin: this.isAdmin,
  };

  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "5d" });
};

UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour

};

UserSchema.methods.generateVerificationToken = function () {
  let payload = {
    userId: this._id,
    token: crypto.randomBytes(20).toString("hex"),
  };

  return new Token(payload);
};

module.exports = mongoose.model("User", UserSchema);
