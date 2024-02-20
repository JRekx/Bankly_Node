const bcrypt = require('bcrypt');
const db = require('../db');
const ExpressError = require('../helpers/expressError');
const sqlForPartialUpdate = require('../helpers/partialUpdate');
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {

  /**
   * Register a new user with provided data.
   * Throws an error if the username is already taken.
   * Returns the new user data excluding the password.
   */
  static async register({username, password, first_name, last_name, email, phone}) {
    // Check for duplicate username
    const duplicateCheck = await db.query(
      `SELECT username 
       FROM users 
       WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new ExpressError(
        `There already exists a user with username '${username}'`,
        400
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    // Insert the new user into the database
    const result = await db.query(
      `INSERT INTO users 
         (username, password, first_name, last_name, email, phone) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING username, first_name, last_name, email, phone`,
      [
        username,
        hashedPassword,
        first_name,
        last_name,
        email,
        phone
      ]
    );

    return result.rows[0];
  }

  /**
   * Authenticate user with username and password.
   * Returns user data if authentication is successful.
   * Throws an error if authentication fails.
   */
  static async authenticate(username, password) {
    // Retrieve user from the database
    const result = await db.query(
      `SELECT username,
              password,
              first_name,
              last_name,
              email,
              phone,
              admin
       FROM users 
       WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    // Compare provided password with the hashed password in the database
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new ExpressError('Cannot authenticate', 401);
    }
  }

  /**
   * Get a list of all users.
   * Returns an array of user data.
   */
  static async getAll() {
    const result = await db.query(
      `SELECT username,
              first_name,
              last_name,
              email,
              phone
       FROM users 
       ORDER BY username`
    );
    return result.rows;
  }

  /**
   * Get data for a single user by username.
   * Returns user data if the user is found.
   * Throws a 404 error if the user is not found.
   */
  static async get(username) {
    const result = await db.query(
      `SELECT username,
              first_name,
              last_name,
              email,
              phone
       FROM users
       WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (!user) {
      throw new ExpressError('No such user', 404); // Fixed: throw the error instead of just creating it
    }

    return user;
  }

  /**
   * Update user data based on provided data.
   * Returns updated user data.
   * Throws a 404 error if the user is not found.
   */
  static async update(username, data) {
    // Generate the SQL for a partial update
    let { query, values } = sqlForPartialUpdate(
      'users',
      data,
      'username',
      username
    );

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError('No such user', 404);
    }

    return user;
  }

  /**
   * Delete a user by username.
   * Returns true if the deletion was successful.
   * Throws a 404 error if the user is not found.
   */
  static async delete(username) {
    const result = await db.query(
      'DELETE FROM users WHERE username = $1 RETURNING username',
      [username]
    );
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError('No such user', 404);
    }

    return true;
  }
}

module.exports = User;
