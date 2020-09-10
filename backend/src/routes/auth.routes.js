const { verifySignUp } = require("../middlewares");
const express = require("express");
const controller = require("../controllers/auth.controller");

const router = express.Router();

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

router.post(
  "/signup",
  //   [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  //   authenticateTokenMiddleware,
  async function (req, res) {
    return controller.signup(req, res);
  }
);
router.post("/signin", async function (req, res) {
  return controller.signin(req, res);
});
module.exports = router;
// };
