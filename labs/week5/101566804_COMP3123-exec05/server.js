const express = require("express");
const studentRoutes = require("./routes/student");
const employeeRoutes = require("./routes/employee");
const collegeV1Routes = require("./routes/college.v1");
const collegeV2Routes = require("./routes/college.v2");

const SERVER_PORT = 3000;

// Initialize Express application
const app = express();

//Application-level middleware and route definition follow
app.use((req, res, next) =>{
  console.log(`Application-level middleware 1 - ${req.method} ${req.url}`)
  next()
});

app.use((req, res, next) =>{
  console.log(`Application-level middleware 2 `)
  next()
});

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Middleware to parse URL-encoded bodies in incoming requests
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
//http://localhost:3000/index.html
// app.use(express.static('public'));

//http://localhost:3000/static/index.html
app.use("/static", express.static("public"));

// Define a route for the root URL
// http://localhost:3000/
app.get("/", (req, res) => {
  res.send("<h1>Hello, world!</h1>");
});

// app.get('/index', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

// http://localhost:3000/hello
app.get("/hello", (req, res) => {
  res.setHeader("x-version-id", "1.0");
  res.setHeader("Content-Type", "text/html");
  res.send("<h1>Hello from the /hello route!</h1>");
});

// Use the student routes for /students endpoint
app.use("/api/v1/students", studentRoutes);

// Use the employee routes for /api/v1/employee endpoint
app.use("/api/v1/employee", employeeRoutes);

// Use the college routes for /api/v1/college and /api/v2/college endpoints
app.use("/api/v1/college", collegeV1Routes);
app.use("/api/v2/college", collegeV2Routes);


//http://localhost:3000/test-error
app.get('/test-error', (req, res) =>{
  throw new Error("This is a test error");
})


//error handling middleware
app.use((err, req, res, next) =>{
  //console.error(err.stack);
  res.status(500).send({
    status: false,
    error: true,
    code: 500,
    message: err.message,
    date: new Date().toISOString()
  });
});


app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port http://localhost:${SERVER_PORT}/`);
});
