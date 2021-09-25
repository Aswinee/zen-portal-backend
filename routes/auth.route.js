const express = require("express");
const router = express.Router();

//Validation
const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

//Controllers
const {
  registerController,
  activationController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/auth.controller");
router.post("/register", validSign, registerController);
router.post("/login", validLogin, loginController);
router.post("/activate", activationController);
router.put(
  "/forgotpassword",
  forgotPasswordValidator,
  forgotPasswordController
);
router.put("/resetpassword", resetPasswordValidator, resetPasswordController);

module.exports = router;
