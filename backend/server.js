require("dotenv").config();
const express = require("express");
const passport = require("passport");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const cors = require("cors");
const session = require("express-session");
const errorMiddleware = require("./middlewares/error");
const routes = require("./routes/index");
const passportMiddleware = require("./middlewares/passport");
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
routes(app);


app.listen(PORT, () => {
	console.log("Backend server is running at: " + PORT);
});
