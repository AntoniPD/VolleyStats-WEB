const config = require("../config/auth.config");
const db = require("../models");
const sendErrorResponse = require("../utils/utils").sendErrorResponse;
const validator = require("validator");

const Team = db.team;

exports.createTeam = async (req, res) => {
  const team = new Team({
    name: req.body.name,
    // email: req.body.email,
  });
  const result = await Team.find({
    name: { $in: req.body.name },
  });
  console.log(result);
  if (result.length > 0) {
    return res
      .status(409)
      .send({ message: "Team with that name already exists" });
  }
  team.save((err, team) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.params.userId) {
      team.user = req.params.userId;
      team.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "Team was registered successfully!" });
      });
      console.log(team);
    }
  });
};

exports.getTeams = async (req, res) => {
  try {
    const result = await Team.find();
    res.json(result);
  } catch (err) {
    // reponse with the caught error
    console.log(err);
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};

exports.getTeamsByUserId = async (req, res) => {
  try {
    const result = await Team.find({
      user: { $in: req.params.userId },
    });
    res.json(result);
  } catch (err) {
    // reponse with the caught error
    console.log(err);
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const result = await Team.findById(req.params.teamId);
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
exports.updateTeam = async (req, res) => {
  try {
    const result = await Team.findById(req.params.teamId);
    if (!result) {
      throw {
        message: "Not existing team",
      };
    }
    if (validator.isAlpha(req.body.name)) {
      const updatedTeam = await Team.findByIdAndUpdate(
        {
          _id: req.params.teamId,
        },
        {
          name: req.body.name,
        },
        { new: true }
      ).exec();
      return res.status(200).send(updatedTeam);
    } else {
      return sendErrorResponse(req, res, 403, "Field validation failed.");
    }
  } catch (err) {
    // reponse with the caught error
    console.log(err);
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
  }
};
exports.deleteTeam = async (req, res) => {
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
