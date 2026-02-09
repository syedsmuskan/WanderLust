// =======================
// REQUIRE PACKAGES
// =======================
if(process.env.NODE_ENV = "production"){
  require('dotenv').config();
}
console.log(process.env);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// =======================
// REQUIRE MODELS
// =======================
const User = require("./models/user");

// =======================
// REQUIRE ROUTES
// =======================
const ExpressError = require("./utils/ExpressError");
const listings = require("./routes/listings");
const reviews = require("./routes/reviews");
const users = require("./routes/user");

// =======================
// DATABASE CONNECTION
// =======================
mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

// =======================
// VIEW ENGINE
// =======================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =======================
// MIDDLEWARE
// =======================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// =======================
// SESSION
// =======================
app.use(session({
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));

app.use(flash());

// =======================
// PASSPORT (ONLY THIS WAY)
// =======================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =======================
// LOCALS
// =======================
app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// =======================
// ROUTES
// =======================
app.use("/", users);
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// =======================
// 404
// =======================
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// =======================
// ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  res.status(statusCode).render("error", { err });
});

// =======================
// SERVER
// =======================
app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
