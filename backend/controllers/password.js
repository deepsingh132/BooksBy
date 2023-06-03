const User = require("../models/User");
const { passwordReset, passwordChangedConfirmation } = require("../utils/EmailTemplates");
const { sendEmail } = require("../utils/sendGrid");
const FRONTEND_URL = process.env.FRONTEND_URL;
const BACKEND_URL = process.env.BACKEND_URL;




// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({
          message:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });

    //Generate and set password reset token
    user.generatePasswordReset();

    // Save the updated user object
    await user.save();

    // send email
    let subject = "Password change request";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link = BACKEND_URL +  "/api/auth/reset/" + user.resetPasswordToken;

    const html = passwordReset(link, user.username);

    await sendEmail({ to, from, subject, html });

    res.status(200).json({
      message:
        "Reset instructions sent to " +
        user.email +
        " successfully! Please check your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    //Redirect user to form with the email address
    res.redirect(
      FRONTEND_URL +
        `/reset_password?token=${token}&email=${user.email}`
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    //Set the new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.isVerified = true;

    // Save the updated user object
    await user.save();

    let subject = "Your password has been changed";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
		let html = passwordChangedConfirmation(user.username, user.email);

    await sendEmail({ to, from, subject, html });

    res.status(200).json({ message: "Your password has been updated." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
