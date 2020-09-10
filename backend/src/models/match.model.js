const mongoose = require("mongoose");

const Game = {
  allyPoints: 0,
  opponentPoints: 0,
};

const matchSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: "TeamModel" },
  opponent: { type: String, required: true },
  games: { type: String },
  allyGames: { type: Number, default: 0 },
  opponentGames: { type: Number, default: 0 },
  opponentErrors: { type: Number, default: 0 },
  opponentPoints: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  errorsPoints: { type: Number, default: 0 },
  players: { type: Array },
  allBlockErrors: { type: Number, default: 0 },
  allSpikeErrors: { type: Number, default: 0 },
  allServeErrors: { type: Number, default: 0 },
  allReceiveErrors: { type: Number, default: 0 },
  allSpikes: { type: Number, default: 0 },
  allBlocks: { type: Number, default: 0 },
  allAces: { type: Number, default: 0 },
  dateOfRegister: { type: Date, default: Date.now },
  dateOfUpdate: { type: Date, default: Date.now },
});

MatchModel = mongoose.model("MatchModel", matchSchema, "match");

module.exports = MatchModel;
