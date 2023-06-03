const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = {};
    let msg = errors.array().map((err) => error[err.param] = err.msg);
    console.log("Error: ", msg);
    return res.status(422).json(msg[0]);
  }

  next();
};