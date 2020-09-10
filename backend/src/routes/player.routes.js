const express = require("express");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/player.controller");

const router = express.Router();

//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

router.post("/user/:userId/team/:teamId/player", async function (req, res) {
  return controller.createPlayer(req, res);
});

// router.get("/team", async (req, res) => {
//   return controller.getTeams(req, res);
// });
router.get("/user/:userId/team/:teamId/player", async (req, res) => {
  return controller.getPlayersByTeamId(req, res);
});
router.get("/user/:userId/team/:teamId/player/:playerId", async (req, res) => {
  return controller.getPlayerById(req, res);
});
router.put("/user/:userId/team/:teamId/player/:playerId", async (req, res) => {
  controller.updatePlayer(req, res);
});

module.exports = router;
