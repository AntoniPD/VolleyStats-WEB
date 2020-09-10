const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.team = require("./team.model");
db.player = require("./player.model");
db.match = require("./match.model");

db.ROLES = ["Statist", "Player", "Fan"];

module.exports = db;
