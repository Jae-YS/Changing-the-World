const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a user schema
const homeworkSchema = new Schema({
  homework_id: {
    type: String,
    unique: true, // Ensures uniqueness
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  homework: {
    type: String,
    required: true,
  },
});

const Homework = mongoose.model("Homework", homeworkSchema);
module.exports = Homework;
