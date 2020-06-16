const mongoose = require("mongoose");

const Game = {
  allyPoints,
  opponentPoints,
};

const matchSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: "TeamModel" },
  opponent: { type: Int16Array, required: true },
  games: { type: String },
  allyGames: { type: Int16Array },
  opponentGames: { type: Int16Array },
  opponentErrors: { type: Int16Array },
  opponentPoints: { type: Int16Array },
  attempts: { type: Int16Array },
  points: { type: Int16Array },
  errors: { type: Int16Array },
  dateOfRegister: { type: Date, default: Date.now },
  dateOfUpdate: { type: Date, default: Date.now },
});

MatchModel = mongoose.model("MatchModel", matchSchema, "match");

module.exports = MatchModel;
