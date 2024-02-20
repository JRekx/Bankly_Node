BUG FOUND(user.js):
    Issue: The get method in the User class does not properly handle the case where a user is not found in the database. The method creates an instance of ExpressError but fails to throw it, resulting in the function silently failing without providing the intended error response.
    Problem: The new keyword is used to create an error object, but the error is not thrown. As a result, the function execution continues as if no error occurred, and the calling code does not receive any indication that the user was not found.
    fix:Throw the ExpressError to ensure that the error is propagated up the call stack and can be caught by error-handling middleware.

BUG FOUND(app.js):
    Issue: Issue: Duplicate module.exports statement in the main application file.
    Problem: The module.exports statement is written twice at the end of the file. This is redundant and could lead to confusion or potential errors if additional exports are added in the future.
    Fix: Remove the duplicate statement.

BUG FOUND(routes/auth.js)
    Issue: Missing await for asynch authentication
    Problem: The authentication middleware is not awaiting the call to the authenticate method. As a result, the function execution continues as if no error occurred,
    FIX: added the await keyword to properly handle the promise returned by the User.authenticate.

BUG FOUND(routes/auth.js)
    Issue: Incorrect Error handling for Authentication Failure
    Problem: The authentication middleware does not handle the case where the user is not found in the database. The function execution continues as if no error occurred,
    FIX: Add a conditional check to handle failed Authenication and throw a 401 error.

BUG FOUND(routes/users.js)
    Issue: Asynch Deltion not Awaited
    Problem: The User.Delete method is not awaited, and therefore the function execution continues as if no error occurred.
    Fix: Added the await keyword to the properly handle the promise tretured by the User.delete method

BUG FOUND(routes/users.js)
    ISSUE: ERROR message clarity
    PROBLEM: The ERROR message for unathorized edits in the PATCH USERNAME Route is incomplte and unclear
    FIX: CORRECTED the error message to cleary state the autho requirement

BUG FOUND(routes/users.js)
    ISSUE: Validation of update fields.
    PROBLEM: The patch/USERNAME  route did not validate the ields that were being updated, potentaly allowing users to update fields that are not allowed to be updated.
    FIX: Added validation to ensure that only the fields that are allowed to be updated are updated.






