const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }
      else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      const admin = await Admin.findOne({
        adminId: req.user.id,
        hasAccess: true,
      }).exec();
      if (!admin && req.user.id !== req.params.id) {
        throw new Error("Action not allowed!");
      }
      next();
    } catch (error) {
      res.status(403).json(error.message);
    }
  });
};


const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      const admin = await Admin.findOne({
        adminId: req.user.id,
        hasAccess: true,
      }).exec();
      if (!admin) {
        throw new Error("Need elevated privileges or access disabled!");
      }
      next();
    } catch (error) {
      res.status(403).json(error.message);
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
};
