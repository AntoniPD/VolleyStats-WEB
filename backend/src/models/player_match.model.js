const mongoose = require("mongoose");

const playerMatchSchema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: "PlayerModel" },
  match: { type: mongoose.Schema.Types.ObjectId, ref: "MatchModel" },
  opponent: { type: String },
  points: { type: Number },
  errorsPoints: { type: Number },
  spikes: { type: Number },
  blocks: { type: Number },
  serveErrors: { type: Number },
  blockErrors: { type: Number },
  receiveErrors: { type: Number },
  spikeErrors: { type: Number },
  aces: { type: Number },
  attempts: { type: Number },
  dateOfRegister: { type: Date, default: Date.now },
  dateOfUpdate: { type: Date, default: Date.now },
});

PlayerMatchModel = mongoose.model(
  "PlayerMatchModel",
  playerMatchSchema,
  "player_match"
);

module.exports = PlayerMatchModel;
