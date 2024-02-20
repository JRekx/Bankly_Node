class ExpressError extends Error {
  /**
   * Custom Error class for Express application errors.
   * 
   * @param {string} message - The error message.
   * @param {number} [status=500] - The HTTP status code for the error.
   */
  constructor(message, status) {
    super(message); // Pass the message to the base Error class
    this.status = status || 500; // Set a default status code if none is provided

    // Capture the stack trace, excluding the constructor call from it.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Log the error stack if not in test environment
    if (process.env.NODE_ENV !== "test") {
      console.error(this.stack);
    }
  }
}

module.exports = ExpressError;
