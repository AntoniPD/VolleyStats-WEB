// const express = require("express");
// const { authJwt } = require("../middlewares");
// const controller = require("../controllers/user.controller");

// const router = express.Router();

// //     res.header(
// //       "Access-Control-Allow-Headers",
// //       "x-access-token, Origin, Content-Type, Accept"
// //     );
// //     next();
// //   });

// router.get("/all", async function (req, res) {
//   return controller.allAccess;
// });

// router.get("/user", [authJwt.verifyToken], async function (req, res) {
//   return controller.userBoard;
// });

// router.get(
//   "/mod",
//   //  [authJwt.verifyToken, authJwt.isModerator],
//   async function (req, res) {
//     return controller.moderatorBoard;
//   }
// );

// router.get(
//   "/admin",
//   //  [authJwt.verifyToken, authJwt.isAdmin],
//   async function (req, res) {
//     return controller.adminBoard;
//   }
// );

// module.exports = router;
// // };
