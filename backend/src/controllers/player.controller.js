const config = require("../config/auth.config");
const db = require("../models");
const sendErrorResponse = require("../utils/utils").sendErrorResponse;
const validator = require("validator");

const Player = db.player;
// use it as module
var Enum = require("enum");

var myEnum = new Enum({
  S: "Setter",
  O: "Opposite",
  M: "Middle-Blocker",
  L: "Libero",
  OH: "Outside-hitter",
});

exports.createPlayer = async (req, res) => {
  const player = new Player({
    name: req.body.name,
    number: req.body.number,
    position: req.body.position,
    height: req.body.height,
    weight: req.body.weight,
  });

  const result = await Player.find({
    team: req.params.teamId,
    number: req.body.number,
  });

  console.log(result);

  if (result.length > 0) {
    return res
      .status(409)
      .send({ message: "Player with that number already exists" });
  }

  player.save((err, player) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.params.teamId) {
      player.team = req.params.teamId;
      player.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Player was registered successfully!" });
      });
    }
  });
};

exports.getPlayers = async (req, res) => {
  try {
    const result = await Player.find();
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};

exports.getPlayersByTeamId = async (req, res) => {
  try {
    const result = await Player.find({
      team: { $in: req.params.teamId },
    });
    res.json(result);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const result = await Player.findById(req.params.playerId);
    if (!result) {
      throw {
        message: "Not existing player",
      };
    }
    res.json(result);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const { name, number, position, height, weight } = req.body;
    const result = await Player.findById(req.params.playerId);
    if (!result) {
      throw {
        message: "Not existing player",
      };
    }
    if (
      validator.isAlpha(name) &&
      name.length < 16 &&
      number < 99 &&
      number > 0 &&
      height < 999 &&
      height > 100 &&
      weight < 999 &&
      weight > 0
    ) {
      const updatedPlayer = await Player.findByIdAndUpdate(
        {
          _id: req.params.playerId,
        },
        {
          name: name,
          number: number,
          position: position,
          height: height,
          weight: weight,
          dateOfUpdate: Date.now(),
        },
        { new: true }
      ).exec();
      return res.status(200).send(updatedPlayer);
    } else {
      return sendErrorResponse(req, res, 403, "Field validation failed.");
    }
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const result = await Player.findByIdAndRemove(req.params.playerId);
    if (!result) {
      throw {
        message: "Not existing player",
      };
    }
    res.json(result);
  } catch (err) {
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};
