const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user');
const _ = require('lodash');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) return res.status(404).send('User was not found.');
  res.send(user);
});

router.get('/bookmarks', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) return res.status(404).send('User was not found.');
  res.send(user.favorites);
});

router.put('/bookmark', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  for (i = 0; i < user.favorites.length; i++) {
    if (user.favorites[i].id.toString() === req.body.id.toString())
      return res.status(400).send('Anime is already in favorites');
  }
  user.favorites.push(req.body);
  await user.save();
  res.send(user.favorites);
});

router.patch('/discard-bookmark/:id', auth, async (req, res) => {
  const filter = { id: req.user.id };
  const removeAnime = {
    favorites: { id: req.params.id },
  };
  const favorites = await User.findOneAndUpdate(filter, { $pull: removeAnime });
  res.json(favorites);
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let usernameError = await User.findOne({ username: req.body.username });
  if (usernameError) return res.status(400).send('Username is already in use.');
  let emailError = await User.findOne({ email: req.body.email });
  if (emailError) return res.status(400).send('Email is already in use.');
  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['id', 'username', 'gender', 'email', 'favorites']));
});

module.exports = router;
