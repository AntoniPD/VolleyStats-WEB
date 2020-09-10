const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  position: { type: String, required: true },
  // role: {
  //   type: String,
  //   deafult: "player",
  // },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "TeamModel" },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  // photo
  dateOfRegister: { type: Date, default: Date.now },
  dateOfUpdate: { type: Date, default: Date.now },
});

PlayerModel = mongoose.model("PlayerModel", playerSchema, "player");

module.exports = PlayerModel;
