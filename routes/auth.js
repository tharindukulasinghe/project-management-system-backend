const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Invalid email or password.");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(400).send("Invalid email or password.");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
    },
    "project-management",
    { expiresIn: 60 * 15 }
  );
  res.send({ token: token });
});

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(555)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1000)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
