const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  const { email, password } = req.body;
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("Invalid email or password.");
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) res.status(400).send("Invalid email or password");
  res.json({ token: user.genAuthToken() });
});

function validate(req) {
  const joiSchema = Joi.object({
    email: Joi.string().required().min(6).max(255).email(),
    password: Joi.string().required().min(6).max(1024),
  });
  return joiSchema.validate(req);
}

module.exports = router;
