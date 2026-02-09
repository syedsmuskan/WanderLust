const Joi = require("joi");

// LISTING VALIDATION
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),

    description: Joi.string().required(),

    image: Joi.object({
      url: Joi.string().allow("", null),
      filename: Joi.string().allow("", null)
    }).optional(),

    price: Joi.number().min(1).required(),

    country: Joi.string().required(),

    location: Joi.string().required()
  }).required()
});


// REVIEW VALIDATION
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required()
  }).required()
});
