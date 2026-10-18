const mongoose = require("mongoose")
const Employee = require("../models/Employee")

//Check if date is valid
const isValidDate = (date) => {
    if (typeof date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
        return false
    }

    return parsedDate.toISOString().slice(0, 10) === date
}


const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({user: req.userId})

        res.status(200).send(employees)

    } catch (err) {
        res.status(500).send({message: "Server error"})
    }
}

const addEmployee = async (req, res) => {
    try {
        const {first_name, last_name, email, position, salary, date_of_joining, department} = req.body

        if (!first_name || !last_name || !email || !position ||
            salary === undefined || !date_of_joining || !department) {
            return res.status(400).send({message: "All fields are required"})
        }

        
if (typeof first_name !== "string" || !first_name.trim() ||
    typeof last_name !== "string" || !last_name.trim() ||
    typeof position !== "string" || !position.trim() ||
    typeof department !== "string" || !department.trim() ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof salary !== "number" || !Number.isFinite(salary) || salary <= 0 ||
    !isValidDate(date_of_joining)) {
    return res.status(400).send({message: "Invalid employee information"})
}


        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
            user: req.userId
        })

        await newEmployee.save()

        res.status(201).send({
            message: "Employee created successfully",
            employee: newEmployee
        })

    } catch (err) {
        if (err.name === "ValidationError" || err.name === "CastError") {
            return res.status(400).send({message: "Invalid employee information"})
        }

        res.status(500).send({message: "Server error"})
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const {eid} = req.params

        if (!mongoose.isObjectIdOrHexString(eid)) {
            return res.status(400).send({message: "Invalid employee ID"})
        }

        const employee = await Employee.findOne({
            _id: eid,
            user: req.userId
        })

        if (!employee) {
            return res.status(404).send({message: "Employee not found"})
        }

        res.status(200).send(employee)

    } catch (err) {
        res.status(500).send({message: "Server error"})
    }
}


const updateEmployee = async (req, res) => {
    try {
        const {eid} = req.params

        if (!mongoose.isObjectIdOrHexString(eid)) {
            return res.status(400).send({message: "Invalid employee ID"})
        }

        const allowedFields = [
            "first_name", "last_name", "email", "position",
            "salary", "date_of_joining", "department"
        ]

        const updates = req.body

        if (!updates || typeof updates !== "object" ||
            Array.isArray(updates) || Object.keys(updates).length === 0 ||
            Object.keys(updates).some(field => !allowedFields.includes(field))) {
            return res.status(400).send({message: "Invalid update information"})
        }

        // Validate updated text fields
        const textFields = ["first_name", "last_name", "position", "department"]

        for (const field of textFields) {
            if (updates[field] !== undefined &&
                (typeof updates[field] !== "string" || !updates[field].trim())) {
                return res.status(400).send({message: "Invalid employee information"})
            }
        }

        // Validate email
        if (updates.email !== undefined &&
            (typeof updates.email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email))) {
            return res.status(400).send({message: "Invalid employee information"})
        }

        // Validate salary
        if (updates.salary !== undefined &&
            (typeof updates.salary !== "number" ||
            !Number.isFinite(updates.salary) || updates.salary <= 0)) {
            return res.status(400).send({message: "Invalid employee information"})
        }

        // Validate date
        if (updates.date_of_joining !== undefined &&
            !isValidDate(updates.date_of_joining)) {
            return res.status(400).send({message: "Invalid employee information"})
        }

        const employee = await Employee.findOne({
            _id: eid,
            user: req.userId
        })

        if (!employee) {
            return res.status(404).send({message: "Employee not found"})
        }

        allowedFields.forEach(field => {
            if (updates[field] !== undefined) {
                employee[field] = updates[field]
            }
        })

        await employee.save()

        res.status(200).send({
            message: "Employee updated successfully",
            employee: employee
        })

    } catch (err) {
        if (err.name === "ValidationError" || err.name === "CastError") {
            return res.status(400).send({message: "Invalid employee information"})
        }

        res.status(500).send({message: "Server error"})
    }
}


const deleteEmployee = async (req, res) => {
    try {
        const {eid} = req.query

        if (!mongoose.isObjectIdOrHexString(eid)) {
            return res.status(400).send({message: "Invalid employee ID"})
        }

        const employee = await Employee.findOneAndDelete({
            _id: eid,
            user: req.userId
        })

        if (!employee) {
            return res.status(404).send({message: "Employee not found"})
        }

        res.status(204).send()

    } catch (err) {
        res.status(500).send({message: "Server error"})
    }
}

module.exports = {
    getAllEmployees,
    addEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
}
