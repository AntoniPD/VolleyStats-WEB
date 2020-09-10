const express = require("express");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/team.controller");

const router = express.Router();

//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

router.post("/user/:userId/team", async function (req, res) {
  return controller.createTeam(req, res);
});

router.get("/team", async (req, res) => {
  return controller.getTeams(req, res);
});
router.get("/user/:userId/team", async (req, res) => {
  return controller.getTeamsByUserId(req, res);
});
router.get("/user/:userId/team/:teamId", async (req, res) => {
  return controller.getTeamById(req, res);
});
router.put("/user/:userId/team/:teamId", async (req, res) => {
  return controller.updateTeam(req, res);
});

module.exports = router;
