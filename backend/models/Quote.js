const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    businessType: String,
    services: [String],
    websiteTier: String,
    deliveryPlatforms: [String],
    addons: [String],
    totalPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
