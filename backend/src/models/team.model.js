const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
  name: { type: String, required: true },
  photo: { type: String },
  dateOfRegister: { type: Date, default: Date.now },
  dateOfUpdate: { type: Date, default: Date.now },
});

TeamModel = mongoose.model("TeamModel", teamSchema, "team");

module.exports = TeamModel;
