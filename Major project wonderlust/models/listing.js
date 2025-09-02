const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
 image: {
  filename: {
    type: String,
    default: "listingimage"
  },
  url: {
    type: String,
    default: "https://unsplash.com/photos/double-rainbow-over-desert-buttes-at-sunset-Ngj2u4PHjBY"
  }
},

  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;