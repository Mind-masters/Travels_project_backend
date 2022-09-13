const mongoose = require("mongoose");
const Helpers = require("../../plugins/Helpers");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validateEmailRegex } = require("../validations/auth");

const placeSchema = new mongoose.Schema(
    {
        title: {type:String, required:true},
        description: {type:String, required:true},
        image: {type:String, required:true},
        address: {type:String, required:true},
        location: {
          lat: {type:Number, required:true},
          lng:{type:Number, required:true}
        },
        // likes: {type: Number, default: 0},
        // comments: {type: String},
        // likedBy: [{type: Schema.Types.ObjectId, ref: "User"}],
        // commentedBy: [{type: Schema.Types.ObjectId, ref: "User"}],
        // creator:{type: Schema.Types.ObjectId, required: true, ref: "User"}
    },
    {
        timestamps: {
            createAt: "created_at",
            updatedAt: "updated_at",
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
  };
};
placeSchema.pre(/'updateOne | findOneAndUpdate'/, function (next) {
  this.set({
    updatedAt: Helpers.getTimeWithoutMilliSeconds(),
  });

  next();
});

placeSchema.pre("save", function () {});
const placeModel = mongoose.model("places", placeSchema, "places");

module.exports = placeModel;
