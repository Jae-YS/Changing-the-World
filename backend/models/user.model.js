const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
    min: 0,
    max: 12,
  },
  availability: {
    type: String,
    required: true,
  },
  schedule_id: {
    type: Schema.Types.ObjectId,
    ref: "Schedule",
  },
  homework_id: {
    type: Schema.Types.ObjectId,
    ref: "Homework",
  },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
