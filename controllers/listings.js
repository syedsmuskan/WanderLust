

// const Listing = require("../models/listing");

// module.exports.index = async (req, res) => {
//   const allListings = await Listing.find({}).populate("owner");
//   res.render("listings/index", { allListings });
// };

// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new");
// };

// module.exports.showListings = async (req, res) => {
//   const { id } = req.params;

//   const listing = await Listing.findById(id)
//     .populate("owner")
//     .populate({
//       path: "reviews",
//       populate: { path: "author" },
//     });

//   if (!listing) {
//     req.flash("error", "Listing not found!");
//     return res.redirect("/listings");
//   }

//   res.render("listings/show", { listing });
// };

// module.exports.createListing = async (req, res) => {
//   const geometry = await getCoordinates(req.body.listing.location);

//   if (!geometry) {
//     req.flash("error", "Location not found");
//     return res.redirect("/listings/new");
//   }

//   const listing = new Listing(req.body.listing);

//   listing.geometry = geometry;

//   listing.image = {
//     url: req.files[0].path,
//     filename: req.files[0].filename,
//   };

//   listing.owner = req.user._id;
//   await listing.save();

//   req.flash("success", "New listing created!");
//   res.redirect("/listings");
// };

// module.exports.renderEditForm = async (req, res) => {
//   const listing = await Listing.findById(req.params.id);

//   if (!listing) {
//     req.flash("error", "Listing not found!");
//     return res.redirect("/listings");
//   }

//   res.render("listings/edit", { listing });
// };

// module.exports.updateListing = async (req, res) => {
//   const listing = await Listing.findByIdAndUpdate(
//     req.params.id,
//     req.body.listing,
//     { new: true, runValidators: true }
//   );

//   // ✅ update image only if new file uploaded
//   if (req.files && req.files.length > 0) {
//     let url = req.files[0].path;
//     let filename = req.files[0].filename;
//     listing.image = { url, filename };
//     await listing.save();
//   }

//   req.flash("success", "Listing updated!");
//   res.redirect(`/listings/${req.params.id}`);
// };

// module.exports.destroyListing = async (req, res) => {
//   await Listing.findByIdAndDelete(req.params.id);
//   req.flash("success", "Listing deleted!");
//   res.redirect("/listings");
// };
const Listing = require("../models/listing");

// =======================
// INDEX
// =======================
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({}).populate("owner");
  res.render("listings/index", { allListings });
};

// =======================
// NEW FORM
// =======================
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// =======================
// SHOW
// =======================
module.exports.showListings = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: { path: "author" },
    });

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing });
};

// =======================
// CREATE (NO MAPBOX, NO GEOCODE)
// =======================
module.exports.createListing = async (req, res) => {
  const listing = new Listing(req.body.listing);

  // image upload (if image exists)
  if (req.files && req.files.length > 0) {
    listing.image = {
      url: req.files[0].path,
      filename: req.files[0].filename,
    };
  }

  listing.owner = req.user._id;

  await listing.save();

  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

// =======================
// EDIT FORM
// =======================
module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/edit", { listing });
};

// =======================
// UPDATE
// =======================
module.exports.updateListing = async (req, res) => {
  const listing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body.listing,
    { new: true, runValidators: true }
  );

  // update image only if new image uploaded
  if (req.files && req.files.length > 0) {
    listing.image = {
      url: req.files[0].path,
      filename: req.files[0].filename,
    };
    await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${listing._id}`);
};

// =======================
// DELETE
// =======================
module.exports.destroyListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
