require("dotenv").config();
const express = require("express");
const passport = require("passport");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const cors = require("cors");
const session = require("express-session");
const errorMiddleware = require("./middlewares/error");
const passportMiddleware = require("./middlewares/passport");

// routes
const auth = require("./routes/auth");
const user = require("./routes/user");
const productRoute = require("./routes/product");
const institutionRoute = require("./routes/institution");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const verifyUserRoute = require('./routes/verifyUser');

const FRONTEND_URL = process.env.FRONTEND_URL
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["https://booksby.onrender.com", FRONTEND_URL, "http://localhost"],
  })
);

mongoose.set('strictQuery', false);
mongoose.promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/checkout/webhook", express.raw({ type: "*/*" })); // for parsing application/json stripe webhook payload

app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "CheeseCake",
    cookie: { maxAge: 604800 },
    store: MongoStore.create({
      client: mongoose.connection.getClient()
    }),
    resave: true,
    saveUninitialized: true,
  })
);
app.use(errorMiddleware);
app.use(passport.initialize());
app.use(passport.session());
passportMiddleware(passport);

app.get("/", (req, res) => {
  res.status(200).send({
    message:
      "Welcome to the BooksBy API",
  });
});

// Routes
app.use("/api/verify-user", verifyUserRoute);
app.use("/api/checkout", stripeRoute);
app.use("/auth", auth);
app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/products", productRoute);
app.use("/api/institute", institutionRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);


app.listen(PORT, () => {
	console.log("Backend server is running at: " + PORT);
});

module.exports = app;