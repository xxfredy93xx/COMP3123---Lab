const express = require("express");
const routes = express.Router();

//employee or route level middleware can be added here
routes.use((req, res, next) =>{
  console.log(`Employee route middleware - ${req.method} ${req.url}`);
  next();
});

//Query parameter example
//http://localhost:3000/employee?name=John&city=Toronto
routes.get("/", (req, res, next) => {
  console.log(req.query);
  const name = req.query.name;
  const city = req.query.city;

    if (!name || !city ) {
    next(new Error("Name and city query parameters are required"));
    
    return; //stop further execution if parameters are missing
  }

  res.send({
    method: "GET",
    path: `/employee?name=${name}&city=${city}`,
    name: name,
    city: city,
  });
});
//Path Parameter example
//http://localhost:3000/employee/John/Toronto
routes.get("/:name/:city", (req, res) => {
  console.log(req.params);
  const name = req.params.name;
  const city = req.params.city;

  res.send({
    method: "GET",
    path: `/employee/${name}/${city}`,
    name: name,
    city: city,
  });
});

//Body Parameter example
routes.post("/", (req, res) => {
  const name = req.body.name;
  const city = req.body.city;

  res.send({
    method: "POST",
    path: `/employee`,
    name: name,
    city: city,
  });
});

module.exports = routes;