/** Application for bank.ly */

const express = require('express');
const app = express();
const ExpressError = require("./helpers/expressError");

// Middleware to parse JSON bodies
app.use(express.json());

// Import route handlers
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Mount route handlers
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

/** 404 handler */
app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // Pass the error to the next piece of middleware
  return next(err);
});

/** General error handler */
app.use(function(err, req, res, next) {
  // Set the status code and return an error response
  res.status(err.status || 500);

  return res.json({
    status: err.status,
    message: err.message
  });
});

// Export the app for use in other files (e.g., starting the server)
module.exports = app;
