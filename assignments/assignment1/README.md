COMP3123 Assignment 1

Employee Management API

This is a basic employee management API made using Node.js, Express and MongoDB.

The user can create an account and log in. Once logged in they can add, view, update and delete employees. Each user can only see and work with their own employees.

What it does:
- Users can register and log in.
- Uses JWT tokens for security.
- Users can add, view, update and delete employees.
- Checks information before saving it.
- Uses bcrypt to hash passwords.
- Uses Helmet and rate limiting for security.
- Has error handling and saves logs.

How to run:
- Open the assignment1 folder.
- Run npm install.
- Create a .env file with the MongoDB connection and JWT secret.
- Start the server using the command in package.json.
- Use Postman to test the API.

API Routes:

- POST /api/v1/user/signup
- POST /api/v1/user/login
- GET /api/v1/emp/employees
- POST /api/v1/emp/employees
- GET /api/v1/emp/employees/:eid
- PUT /api/v1/emp/employees/:eid
- DELETE /api/v1/emp/employees?eid=ID
- GET /health

Testing:

I used Postman to test the different routes and make sure everything was working. I also tested invalid information, JWT authentication and making sure users cannot access other users' employees.

Database:

The project uses MongoDB Atlas to save user and employee information.