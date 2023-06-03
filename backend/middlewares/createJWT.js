// Import JWT library
const jwt = require("jsonwebtoken");

// Create a JWT for the user after successful authentication
const createJWT = (user) => {
  const payload = {
    id: user._id,
    isAdmin: user.isAdmin,
    email: user.email,
    username: user.username,
    name: user.name,
    img: user.img,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "5d",
  });
  return token;
};

module.exports = createJWT;
