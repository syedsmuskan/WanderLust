const User = require("../models/user");
const passport = require("passport");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.signupUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to WanderLust!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.loginUser = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};
