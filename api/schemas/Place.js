const { boolean } = require("joi");
const mongoose = require("mongoose");
const Helpers = require("../../plugins/Helpers");

const placeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    address: { type: String, required: false },
    location: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createAt: "created_at",
      updatedAt: "updated_at",
      currentTime: () => new Date().toLocaleString(),
    },
  }
);

placeSchema.methods.jsonData = function () {
  return {
    title: this.title,
    description: this.description,
    image: this.image,
    address: this.address,
    location: this.location,
    likes: this.likes,
    comments: this.comments,
    deleted: this.deleted,
  };
};
placeSchema.pre(/'updateOne | findOneAndUpdate'/, function (next) {
  this.set({
    updatedAt:  new Date().toLocaleString(),
  });
  next();
});

const placeModel = mongoose.model("places", placeSchema, "places");

module.exports = placeModel;
