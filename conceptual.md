### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
JWT stands for JSON WEBTOKEN.  It is a way to send data securely between two parties. 

- What is the signature portion of the JWT?  What does it do? 
JWT signature is its cryptographic code; it secures and verifies that the sender is legit and the message hasn't been tampered with.

- If a JWT is intercepted, can the attacker see what's inside the payload? 
Yes, because the base64 encoded and not encrypted. Encoding is ment to maintain data usability and can easily be reversed.

- How can you implement authentication with a JWT?  Describe how it works at a high level.
1.User logs in with cred.
2.The server veriifes creds and if correct, generate a JWT containing user info. Then sings in with secret key.
3.The server sends the JWT to the client, stored locally or in a cookie..

- Compare and contrast unit, integration and end-to-end tests.
Unit tests are used to test the smallest unit of code. Integration tests are used to test the smallest unit of code and the code that interacts with. 
End to end tests are used to test the entire application.


- What is a mock? What are some things you would mock?
A mock is a fake version of a function or object that you create to test different parts of your code without using the real thing. You would mock things like API calls, database operations, or any external service to ensure your tests are fast and only testing your code. Mocks help you simulate and control the behavior of these external dependencies during testing.


- What is continuous integration?
Commonly referred to as CI, continuous integration is the practice of merging all developer working copies with a shared mainline several times a day.

- What is an environment variable and what are they used for?
A enviroment variable is a dynamic-named value that is set outside of a program. Used to store config options and system settings, they are used to keep sensitive data out of code and to change software behavior without altering the source code.


- What is TDD? What are some benefits and drawbacks?
Test-Driven Development (TDD), is a software development apporach where you write test for new feat before you write the code to implement the feature. This helps you write clean code and helps you identify bugs early in the process.

Benefits of TDD include: 
  - Reduces the risk of bugs
  - Reduces the time to develop new features
  - Reduces the time to refactor code

Drawbacks of TDD include:
  - It is more difficult to write tests for legacy code
  - It is more difficult to write tests for code that is not yours
  - It can be be time-consuming to write tests for new features

- What is the value of using JSONSchema for validation?
  JSONSchema has several benefits:
    1.Consistency: It ensures that JSON data structure is consistent across different applications.
    2.Automation: Validation can be automated using tools like Swagger.
    3.Clarity: It servers as a clear, machine-readable doc of the expected data format.
    4.Error Handling: It can be used to provide more meaningful error messages to the user.
    5.Development speed: It can be used to validate data before it is sent to the server.

- What are some ways to decide which code to test?
  We should always prioritize testing the code that is most likely to break. We should also test the code that is most likely to be used. Also, we should test the code that is most likely to change. User impacted features are always good to test because they consist of so many vars.

- What does `RETURNING` do in SQL? When would you use it?
RETURNING in SQL is used to return data from a query, we use it when we want to return the data that was created or updated.

- What are some differences between Web Sockets and HTTP?
HTTP is a request-response protocol. Web sockets are bi-directional, full-duplex, persistent connections between the client and server.

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?
Flask, and the reason being is that flask is minimal yet flexible and allows me to add componenets that I need without having to re-write the entire framework. As oppose to Express though being light weight and flexible is still requires middleware for many features so it may take more time. Also I prefer python over Javascript for the straightforwarded'ness of the language. 