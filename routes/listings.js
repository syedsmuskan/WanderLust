const express = require("express");
const router = express.Router();

const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema");
const { isLoggedIn, isOwner } = require("../middleware");

const listingsController = require("../controllers/listings");

// import storage
const { storage } = require("../cloudConfig");

const multer = require("multer");
const upload = multer({ storage });

// =======================
// VALIDATION
// =======================
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  }
  next();
};

// =======================
// INDEX + CREATE
// =======================
router
  .route("/")
  .get(wrapAsync(listingsController.index))
  .post(
    isLoggedIn,
    upload.array("images", 2),
    validateListing,
    wrapAsync(listingsController.createListing)
  );

// =======================
// NEW
// =======================
router.get("/new", isLoggedIn, listingsController.renderNewForm);

// =======================
// SHOW + UPDATE + DELETE
// =======================
router
  .route("/:id")
  .get(wrapAsync(listingsController.showListings))
  .put(
    isLoggedIn,
    isOwner,
    upload.array("images", 2),
    validateListing,
    wrapAsync(listingsController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingsController.destroyListing)
  );

// =======================
// EDIT
// =======================
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderEditForm)
);

module.exports = router;
