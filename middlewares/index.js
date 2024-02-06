const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `${Date.now()}: ${req.method}: ${req.path}\n`,
      (error, data) => {
        next(); // passing to next step of the code
      }
    );
  };
}

module.exports = {
  logReqRes,
};
