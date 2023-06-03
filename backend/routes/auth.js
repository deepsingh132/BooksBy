const express = require('express');
const {check} = require('express-validator');

const Auth = require('../controllers/auth');
const Password = require('../controllers/password');
const validate = require('../middlewares/validate');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
        success: true,
        message: "Successfull",
        user: req.user,
    });
    }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// Google Sign-In Route
router.get('/google', passport.authenticate("google", { scope: ['profile', 'email'] }));

// Google Sign-In Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const { token } = req.user;
        res.redirect(process.env.FRONTEND_URL + `/login?token=${token}`);
    // res.redirect(`http://localhost:3000/login?user=${req.user}`);
    /**
     * @TODO Redirect user to frontend client URL with the jwt token attached as a query parameter instead of the current response.
     */
  }
);

function authenticateToken(req, res, next) {
  if (!req) {
    return res.sendStatus(401);
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    req.token = token;
    next();
  });
}

router.post('/login/verify-token', authenticateToken, async (req, res) => {
  const user = req.user;
  res.json({ token: req.token , user: user });
});


router.get('/', (req, res) => {
    res.status(200).json({message: "You are in the Auth Endpoint. Register or Login to test Authentication."});
});

router.post('/register', [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().isLength({min: 8, max: 128}).withMessage('Must be at least 8 chars long'),
    check('name').not().isEmpty().withMessage('Your name is required'),
], validate, Auth.register);

router.post("/login", [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty(),
], validate, Auth.login);


//EMAIL Verification
router.get('/verify/:token', Auth.verify);
router.post('/resend', Auth.resendToken);

//Password RESET
router.post('/recover', [
    check('email').isEmail().withMessage('Enter a valid email address'),
], validate, Password.recover);

router.get('/reset/:token', Password.reset);

router.post('/reset/:token', [
    check('password').not().isEmpty().isLength({min: 8}).withMessage('Must be at least 8 chars long'),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
], validate, Password.resetPassword);


module.exports = router;