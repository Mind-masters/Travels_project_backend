const mongoose = require("mongoose");
const crypto = require("crypto");
const { validateEmailRegex } = require("../validations/auth");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: false,
      default: "",
    },
    email: {
      type: String,
      match: validateEmailRegex,
      unique: true,
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
    refresh_token: {
      type: String,
      default: "",
    },
    interests: {
      type: [String],
      default: [],
    },
    biography: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    access_token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: "active", // active || inactive
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user", // user || admin
    },
    setting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "setting",
    },
    last_in_logged: {
      type: Date,
      default: new Date().toLocaleString(),
    },
    points: {
      type: Number,
      default: 1,
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

userSchema.methods.jsonData = function () {
  return {
    name: this.name,
    email: this.email,
    phone: this.phone,
    address: this.address,
    avatar: this.avatar,
    backgroundImage: this.backgroundImage,
    role: this.role,
    setting: this.setting,
    location: this.location,
    points: this.points,
  };
};
userSchema.pre(/'updateOne | findOneAndUpdate'/, function (next) {
  this.set({
    updatedAt: new Date().toLocaleString(),
  });
  next();
});

const userModel = mongoose.model("user", userSchema, "user");

module.exports = userModel;
