const {
  verifyToken
} = require("../utils/verifyToken");

const router = require("express").Router();

const handleVerification = async (req, res) => {
  const user = req.user;
  try {
    if (user) {
      return res.status(200).json("Token is valid!");
    } else {
      return res.status(403).json("Null");
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error!");
  }
}

router.post("/", verifyToken, handleVerification);

module.exports = router;