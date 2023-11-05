const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a user schema
const scheduleSchema = new Schema({
  schedule_id: {
    type: Number, // Assuming userId is a numeric primary key
    unique: true, // Ensures uniqueness
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
