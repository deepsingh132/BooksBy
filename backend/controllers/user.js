const User = require("../models/User");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
  verifyTokenAndAdmin(req, res, async () => {
    const query = req.query.new;
    try {
      const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
          res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  })
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
  verifyTokenAndAdmin(req, res, async () => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(401).json({ message: "User does not exist" });
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
};

// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
  verifyTokenAndAuth(req, res, async () => {
    try {
      const update = req.body;
      const id = req.params.id;
      const user = await User.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true }
      );
      //if there is no image, return success message
      if (!req.file) {
        const { password, ...others } = user._doc;
        return res.status(200).json({ user: { ...others }, message: "User has been updated" });
      }

      if (!req.file) {
        const { password, ...others } = updatedUser._doc;
        return res
          .status(200)
          .json({ user: { ...others }, message: "User has been updated" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
  verifyTokenAndAuth(req, res, async () => {
    try {
      const id = req.params.id;
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
};

exports.getStats = async function (req, res) {
  verifyTokenAndAdmin(req, res, async () => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });
}