const mongoose = require("mongoose");
const crypto = require("crypto");
const { timeStamp } = require("console");
const userData = require("../config/data");

//User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "Normal",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    geekcoins: {
      type: Number,
      default: 10000,
    },
    attendance: {
      type: Number,
      default: 8,
    },
    tasks: {
      type: Array,
      default: userData[0].tasks,
    },
    queries: {
      type: Array,
      default: userData[1].queries,
    },
  },
  { timeStamp: true }
);
// virtual to encrypt password
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods to create salt, encrypt password and verify password
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
