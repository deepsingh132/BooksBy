require("dotenv").config();
const express = require("express");
const passport = require("passport");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const errorMiddleware = require("./middlewares/error");
const routes = require("./routes/index");
const passportMiddleware = require("./middlewares/passport");
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false);
mongoose.promise = global.Promise;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

console.log("Allowed Origins: ", allowedOrigins);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "CheeseCake",
    resave: false,
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