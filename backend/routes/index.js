const auth = require("./auth");
const user = require("./user");
// const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth");
const productRoute = require("../routes/product");
const institutionRoute = require("../routes/institution");
const cartRoute = require("../routes/cart");
const orderRoute = require("../routes/order");
const stripeRoute = require("../routes/stripe");
const verifyUserRoute = require('../routes/verifyUser');

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({
      message:
        "Welcome to the AUTHENTICATION API. Register or Login to test Authentication.",
    });
  });

  app.use("/api/verify-user", verifyUserRoute);

  app.use("/api/checkout", stripeRoute);


  app.use("/auth", auth);

  app.use("/api/auth", auth);
  app.use("/api/users", user);

  // app.use("/api/auth", authRoute);
  // app.use("/api/users", userRoute);
  app.use("/api/products", productRoute);
  app.use("/api/institute", institutionRoute);
  app.use("/api/carts", cartRoute);
  app.use("/api/orders", orderRoute);
};
