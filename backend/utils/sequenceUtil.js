const Counter = require("../models/counter.model"); // Import the Counter model

async function getNextIdValue(sequenceName) {
  const counter = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
}
module.exports = {
  getNextIdValue,
};
