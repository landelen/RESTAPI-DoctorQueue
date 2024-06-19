const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 2,
    maxlength: 20,
  },
  surname: {
    type: String,
    required: [true, "Please provide surname"],
    minlength: 4,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide email",
    ],
    unique: true,
  },
  phone: {
    countryCode: {
      type: String,
      required: [true, "Please provide country code"],
      minlength: 1,
      maxlength: 5,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide phone number"],
      minlength: 5,
      maxlength: 15,
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    maxlength: 30,
  },
});

DoctorSchema.index({ "phone.countryCode": 1, "phone.phoneNumber": 1 }, { unique: true });

DoctorSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

DoctorSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

DoctorSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      role: "doctor",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  );
};

module.exports = mongoose.model("Doctor", DoctorSchema);
