const mongoose = require("mongoose");

// connection of mongoose with database
// we have to pass the url of database inside connect and this returns a promise of type mongoose
async function connectMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDB,
};
