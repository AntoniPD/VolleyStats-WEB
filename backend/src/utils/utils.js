module.exports.sendErrorResponse = function (req, res, status, message, err) {
  if (process.env.NODE_ENV !== "development") {
    err = undefined;
  }

  console.log("ERROR: ", err);
  res.status(status).json({
    code: status,
    message,
    error: err,
  });
};
