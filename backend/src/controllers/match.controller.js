const config = require("../config/auth.config");
const db = require("../models");
const sendErrorResponse = require("../utils/utils").sendErrorResponse;
const playerController = require("./player.controller");
// const validator = require("validator");

const Match = db.match;
const Player = db.player;

exports.createMatch = async (req, res) => {
  if (!req.params.teamId) {
    res.status(400).send({ message: "TeamId is not passed!" });
  }
  const players = await Player.find({
    team: { $in: req.params.teamId },
  });
  let matchPlayers = [];

  for (let i = 0; i < players.length; i++) {
    currPlayer = players[i];
    console.log(currPlayer);
    matchPlayers[i] = {
      playerId: currPlayer._id,
      name: currPlayer.name,
      number: currPlayer.number,
      position: currPlayer.position,
      points: 0,
      errorPoints: 0,
      allyPoints: 0,
      spikes: 0,
      blocks: 0,
      serveErrors: 0,
      blockErrors: 0,
      receiveErrors: 0,
      spikeErrors: 0,
      aces: 0,
      attempts: 0,
    };
  }
  const match = new Match({
    opponent: req.body.name,
    players: matchPlayers,
  });

  match.save((err, match) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(req.params.teamdId);
    console.log(match);
    // change if too hard to check the role
    match.team = req.params.teamId;
    match.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ matchId: match.id, message: "Match Started" });
    });
    console.log(match);
  });
};

exports.getMatch = async (req, res) => {
  if (!req.params.matchId) {
    res.status(400).send({ message: "MatchId is not passed!" });
  }
  try {
    const result = await Match.findById(req.params.matchId);
    if (!result) {
      throw {
        message: "Not existing match",
      };
    }
    res.json(result);
  } catch (err) {
    // reponse with the caught error
    console.log(err);
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Match.find();
    res.json(result);
  } catch (err) {
    // reponse with the caught error
    console.log(err);
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const {
      allyGames,
      opponentGames,
      opponentErrors,
      opponentPoints,
      attempts,
      points,
      errorPoints,
      players,
    } = req.body;
    const result = await Match.findById(req.params.matchId);
    if (!result) {
      throw {
        message: "Not existing match",
      };
    }
    const updatedMatch = await Match.findByIdAndUpdate(
      {
        _id: req.params.matchId,
      },
      {
        allyGames: allyGames,
        opponentGames: opponentGames,
        opponentErrors: opponentErrors,
        opponentPoints: opponentPoints,
        attempts: attempts,
        points: points,
        errorPoints: errorPoints,
        players: players,
        dateOfUpdate: Date.now(),
      },
      { new: true }
    ).exec();
    return res.status(200).send(updatedMatch);
  } catch (err) {
    // reponse with the caught error
    console.log(err);
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const result = await Team.findByIdAndRemove(req.params.teamId);
    if (!result) {
      throw {
        message: "Not existing team",
      };
    }
    res.json(result);
  } catch (err) {
    // reponse with the caught error
    console.log(err);
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};
