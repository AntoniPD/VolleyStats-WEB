const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: String,
});

const RoleModel = mongoose.model("RoleModel", roleSchema, "role");

module.exports = RoleModel;
