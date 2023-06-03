const User = require('../models/User')
const Token = require("../models/Token");
const { sendEmail } = require("../utils/sendGrid");
const { accountActivation } = require('../utils/EmailTemplates');
const FRONTEND_URL = process.env.FRONTEND_URL;
const BACKEND_URL = process.env.BACKEND_URL;

const generateUsername = (name) => {
  const seconds = Math.floor(Date.now() / 1000).toString();
  const firstTwoDigits = seconds.slice(-2);
  const lastTwoDigits = Math.floor(10 + Math.random() * 90);
  const username = `${name.replace(
    /\s+/g,
    ""
  )}#${firstTwoDigits}${lastTwoDigits}`;
  return username;
};

exports.register = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user)
      return res.status(401).json({
        message:
          "The email address you have entered is already associated with another account!",
      });

    const username = generateUsername(name);

    const newUser = new User({
      username: username,
      name: name,
      email: email,
      password: password,
      role: "basic"
    });

    const user_ = await newUser.save();
    await sendVerificationEmail(user_, req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.login = async (req, res, next) => {

  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        msg:
          "The email address " +
          email +
          " is not associated with any account. Recheck your email address and try again",
      });

    if (!user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: "Invalid email address or password" });
    }

    // Make sure the user has been verified
    if (!user.isVerified)
      return res.status(401).json({
        type: "not-verified",
        message: "Your account has not been verified yet",
      });

    const { password, ...others } = user._doc;

    return res.status(200).json({ token: user.generateJWT(), user: { ...others } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public
exports.verify = async (req, res) => {
  if (!req.params.token)
    return res
      .status(400)
      .json({ message: "We were unable to find a user for this token." });

  try {
    const token = await Token.findOne({ token: req.params.token });

    if (!token)
      return res.status(400).json({
        message:
          "We were unable to find a valid token. Your token may have expired.",
      });

    User.findOne({ _id: token.userId }, (err, user) => {
      if (!user)
        return res
          .status(400)
          .json({ message: "We were unable to find a user for this token." });

      if (user.isVerified)
        return res
          .status(201)
          .json({ message: `Email: ${user.email} verified successfully!` });

      user.isVerified = true;
      user.save(function (err) {
        if (err) return res.status(500).json({ message: err.message });
        res.redirect(
          FRONTEND_URL +
            `/login?verifytoken=${req.params.token}&email=${user.email}`
        );
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.resendToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message:
          "The email address " +
          req.body.email +
          " is not associated with any account. Double-check your email address and try again.",
      });

    if (user.isVerified)
      return res.status(400).json({
        message: "This account has already been verified. Please log in.",
      });

    await sendVerificationEmail(user, req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


async function sendVerificationEmail(user, req, res) {
  try {
    const token = user.generateVerificationToken();

    // Save the verification token
    await token.save();

    let subject = "Verify BooksBy account";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link = BACKEND_URL + "/api/auth/verify/" + token.token;
    const html = accountActivation(user.name, link);

    await sendEmail({ to, from, subject, html });

    res.status(200).json({
      message: "A verification email has been sent to " + user.email + ".",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
