const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion } = require("mongodb");
// const mockData = require("./mock-data");
// const User = require("./models/user.model");

const userRouter = require("./routes/user.routes");
const scheduleRouter = require("./routes/schedule.routes");
const homeworkRouter = require("./routes/homework.routes");

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Define the port for your server
const PORT = process.env.PORT || 10000;

// MongoDB connection URI from environment variables
const mongoURI = process.env.ATLAS_CONNECTION;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to the MongoDB client when the server starts
async function connectMongoClient() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Close the MongoDB client connection when the server is shutting down
process.on("SIGINT", async () => {
  console.log("Closing MongoDB client connection...");
  await client.close();
  console.log("MongoDB client connection closed.");
  process.exit(0);
});

connectMongoClient().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
// app.use("/schedule", scheduleRouter);
// app.use("/homework", homeworkRouter);

// const insertMockData = async () => {
//   try {
//     for (const data of mockData) {
//       await User.create(data);
//     }
//     console.log("Mock data inserted successfully.");
//   } catch (error) {
//     console.error("Error inserting mock data:", error);
//   } finally {
//     client.close(); // Close the database connection
//   }
// };

// insertMockData();
