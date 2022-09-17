const mongoose = require("mongoose");
const Helpers = require("../../plugins/Helpers");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validateEmailRegex } = require("../validations/auth");
const { string } = require("joi");

const places = new mongoose.Schema({
  place_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "places",
    require: false,
  },
});
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: false,
      default: "",
    },
    lastName: {
      type: String,
      require: false,
      default: "",
    },
    email: {
      type: String,
      match: validateEmailRegex,
      require: true,
    },
    phone: {
      type: String,
      require: false,
      default: "",
    },
    address: {
      type: String,
      require: false,
      default: "",
    },
    avatar: {
      type: String,
      required: false,
      default: "",
    },
    backgroundImage: {
      type: String,
      required: false,
      default: "",
    },
    salt: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active", // active || inactive
    },
  },
  {
    timestamps: {
      createAt: "created_at",
      updatedAt: "updated_at",
      currentTime: () => new Date().toLocaleString(),
    },
  }
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateToken = async function (member = false) {
  let expiresIn = "1d";
  if (member) expiresIn = "365d";
  const payload = {
    email: this.email,
    phone: this.phone,
    id: this._id,
  };

  const secret = process.env.USER_SECRET;
  const options = {
    expiresIn,
  };

  const token = jwt.sign(payload, secret, options);
  return token;
};

userSchema.methods.jsonData = function () {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phone: this.phone,
    address: this.address,
    avatar: this.avatar,
    backgroundImage: this.backgroundImage,
    status: this.status,
  };
};
userSchema.pre(/'updateOne | findOneAndUpdate'/, function (next) {
  this.set({
    updatedAt: new Date().toLocaleString(),
  });

  next();
});

userSchema.pre("save", function () {});
const userModel = mongoose.model("user", userSchema, "user");

module.exports = userModel;
