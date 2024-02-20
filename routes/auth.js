const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createTokenForUser = require('../helpers/createToken');

router.post('/register', async function(req, res, next) {
  try {
    const { username, password, first_name, last_name, email, phone } = req.body;
    let user = await User.register({ username, password, first_name, last_name, email, phone });
    const token = createTokenForUser(username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    let user = await User.authenticate(username, password); // Use await to handle the promise
    if (user) {
      const token = createTokenForUser(username, user.admin);
      return res.json({ token });
    } else {
      // If authentication fails, throw a 401 error
      throw new ExpressError('Invalid username/password', 401);
    }
  } catch (err) {
    return next(err);
  }
}); // end

module.exports = router;
