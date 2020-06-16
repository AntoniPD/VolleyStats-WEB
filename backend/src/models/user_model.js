const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, maxlength: 15 },
  password: { type: String, required: true, minlength: 8 },
  role: {
    type: String,
    required: true,
    enum: ["anonymous", "statist", "player", "fan"],
  },
  dateOfRegister: { type: Date, default: Date.now },
  dateOfUpdate: { type: Date, default: Date.now },
});

UserModel = mongoose.model("UserModel", userSchema, "user");

module.exports = UserModel;
