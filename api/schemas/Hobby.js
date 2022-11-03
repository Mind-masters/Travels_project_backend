const mongoose = require("mongoose");

const hobbySchema = new mongoose.Schema(
  {
   looking_followed_travelers: {
      type: Boolean,
      default: false,
    },
    home_stay_programs: {
      type: Boolean,
      default: false,
    },
    booking_opportunities: {
      type: Boolean,
      default: false,
    },
  }
);

const hobbyModel = mongoose.model("hobby", hobbySchema, "hobby");

module.exports = hobbyModel;
