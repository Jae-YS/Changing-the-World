const router = require("express").Router();
let User = require("../models/user.model");
const mongoose = require("mongoose");
const MongooseError = mongoose.Error; // Import the MongooseError class

router.route("/new").post(async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new User({
      name: req.body.name,
      grade: req.body.grade,
      availability: req.body.availability,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
