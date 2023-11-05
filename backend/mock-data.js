const mongoose = require("mongoose");
const User = require("./models/user.model"); // Adjust the path as needed

// Create a reference to the Schedule model
const Schedule = require("./models/schedule.model"); // Adjust the path as needed
const Homework = require("./models/homework.model"); // Adjust the path as needed

const mockData = [
  {
    user_id: 1,
    name: "John Doe",
    grade: 10,
    availability: "Available",
    schedule_id: new mongoose.Types.ObjectId(),
    homework_id: new mongoose.Types.ObjectId(),
  },
  {
    user_id: 2,
    name: "Alice Johnson",
    grade: 12,
    availability: "Not Available",
    schedule_id: new mongoose.Types.ObjectId(),
    homework_id: new mongoose.Types.ObjectId(),
  },
  {
    user_id: 3,
    name: "Bob Smith",
    grade: 9,
    availability: "Available",
    schedule_id: new mongoose.Types.ObjectId(),
    homework_id: new mongoose.Types.ObjectId(),
  },
  // Add more mock data as needed
];

module.exports = mockData;
