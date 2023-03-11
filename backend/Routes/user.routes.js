// imports
const express = require("express");
const { check } = require("express-validator");
// projects internal imports
const userController = require("../Controller/user.controller");
const auth = require("../Middleware/auth");

const router = express.Router();

// routes
router.post(
  "/login",
  [
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter an email"),
    check("password").not().isEmpty().withMessage("Password is requied"),
  ],
  userController.login
);
router.post(
  "/signup",
  [
    check("name").not().isEmpty().withMessage("Please Enter a name"),
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Email Field is required"),
    check("password").not().isEmpty().withMessage("Please Enter Password"),
  ],
  userController.signup
);

// auth middleware
router.use(auth);

router.patch("/update", userController.updateProfile);
router.post("/me", userController.userProfile);

module.exports = router;
