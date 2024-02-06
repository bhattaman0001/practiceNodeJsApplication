const mongoose = require("mongoose");

//schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

//model for database
const User = mongoose.model("user", userSchema);

module.exports = User;
