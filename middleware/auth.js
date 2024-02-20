function authUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.replace(/^[Bb]earer /, '') : null;

    if (token) {
      jwt.verify(token, SECRET_KEY, function(err, payload) {
        if (err) {
          // Explicitly handle authentication errors
          const unauthorizedError = new ExpressError('Unauthorized', 401);
          return next(unauthorizedError);
        }
        // Check if the payload contains the necessary properties
        if (payload && payload.username && typeof payload.admin !== 'undefined') {
          req.curr_username = payload.username;
          req.curr_admin = payload.admin;
          return next();
        } else {
          // Handle the case where the payload structure is not as expected
          const invalidTokenError = new ExpressError('Invalid token', 401);
          return next(invalidTokenError);
        }
      });
    } else {
      // If no token is provided, proceed without setting user info
      return next();
    }
  } catch (err) {
    // Handle unexpected errors differently from authentication errors
    const serverError = new ExpressError('Server error', 500);
    return next(serverError);
  }
}
