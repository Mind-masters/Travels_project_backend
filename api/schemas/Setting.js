const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    following_travelers: {
      type: Boolean,
      default: false,
    },
    show_location: {
      type: Boolean,
      default: false,
    },
  }
);

const settingModel = mongoose.model("setting", settingSchema, "setting");

module.exports = settingModel;
