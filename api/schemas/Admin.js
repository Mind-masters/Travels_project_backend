const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { validateEmailRegex } = require("../validations/auth");
const { string } = require("joi");


const adminSchema = new mongoose.Schema(
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
      dropDups: true,
      require: true,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
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
    access_token: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "active", // active || inactive
    },  
    role: {
      type: String,
      default: "admin", // user || admin
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

adminSchema.index({ email: 1 }, { unique: true });

adminSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

adminSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};


adminSchema.methods.jsonData = function () {
  return {
    name: this.name,
    email: this.email,
    phone: this.phone,
    address: this.address,
    avatar: this.avatar,
    role:this.role
  };
};
adminSchema.pre(/'updateOne | findOneAndUpdate'/, function (next) {
  this.set({
    updatedAt: new Date().toLocaleString(),
  });
  next();
});

const adminModel = mongoose.model("admin", adminSchema, "admin");

module.exports = adminModel;
