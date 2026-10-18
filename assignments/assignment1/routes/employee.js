
const express = require("express")
const auth = require("../middleware/auth")
const employeeController = require("../controllers/employeeController")

const routes = express.Router()

routes.use(auth)

routes.get("/employees", employeeController.getAllEmployees)

routes.post("/employees", employeeController.addEmployee)

routes.put("/employees/:eid", employeeController.updateEmployee)

routes.delete("/employees", employeeController.deleteEmployee)

routes.get("/employees/:eid", employeeController.getEmployeeById)

module.exports = routes
