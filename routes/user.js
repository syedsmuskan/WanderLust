const express = require("express");
const router = express.Router();
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware");
const usersController = require("../controllers/users");

// =======================
// SIGNUP (FORM + CREATE)
// =======================
router
  .route("/signup")
  .get(usersController.renderSignupForm)
  .post(wrapAsync(usersController.signupUser));

// =======================
// LOGIN (FORM + AUTH)
// =======================
router
  .route("/login")
  .get(usersController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usersController.loginUser
  );

// =======================
// LOGOUT
// =======================
router.get("/logout", usersController.logoutUser);

module.exports = router;
