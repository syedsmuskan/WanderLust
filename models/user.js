const mongoose = require("mongoose");

// Node 21 safe import
const passportLocalMongoose =
  require("passport-local-mongoose").default ||
  require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  }
});

// ⛔ THIS LINE IS MANDATORY
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
