const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const { reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, isReviewAuthor } = require("../middleware");

const reviewController = require("../controllers/reviews");

// VALIDATION
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  }
  next();
};

// CREATE REVIEW
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// DELETE REVIEW
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
