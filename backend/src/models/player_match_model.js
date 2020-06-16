const mongoose = require("mongoose");

const playerMatchSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "PlayerModel" },
  match: { type: mongoose.Schema.Types.ObjectId, ref: "MatchModel" },
  opponent: { type: String },
  points: { type: Int16Array },
  errors: { type: Int16Array },
  spikes: { type: Int16Array },
  blocks: { type: Int16Array },
  serveErrors: { type: Int16Array },
  blockErrors: { type: Int16Array },
  receiveErrors: { type: Int16Array },
  spikeErrors: { type: Int16Array },
  aces: { type: Int16Array },
  attempts: { type: Int16Array },
  dateOfRegister: { type: Date, default: Date.now },
  dateOfUpdate: { type: Date, default: Date.now },
});

PlayerMatchModel = mongoose.model(
  "PlayerMatchModel",
  playerMatchSchema,
  "player_match"
);

module.exports = PlayerMatchModel;
