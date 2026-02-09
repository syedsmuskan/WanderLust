// init/index.js  (FINAL, CORRECT, WORKING)

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const initData = require("./data");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to db");
}

const initDB = async () => {
  await Listing.deleteMany({});

  // ✅ get ONE real user from DB
  const user = await User.findOne();
  if (!user) {
    console.log("No user found. Create a user first.");
    return;
  }

  // ✅ assign real owner id to all listings
  const listingsWithOwner = initData.data.map(obj => ({
    ...obj,
    owner: user._id
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("data was initialized with owner");
};

main()
  .then(initDB)
  .catch(err => console.log(err));
