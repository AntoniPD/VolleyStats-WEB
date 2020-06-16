const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Int16Array, required: true },
  position: { type: String, required: true, minlength: 8 },
  role: {
    type: String,
    deafult: "player",
  },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "TeamModel" },
  height: { type: Int16Array, required: true },
  weight: { type: Int16Array, required: true },
  // photo
  dateOfRegister: { type: Date, default: Date.now },
  dateOfUpdate: { type: Date, default: Date.now },
});

PlayerModel = mongoose.model("PlayerModel", playerSchema, "player");

module.exports = PlayerModel;
