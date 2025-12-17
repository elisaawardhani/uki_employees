const express = require('express')
const router = express.Router()
const Employee = require('../models/Employee')

router.get('/', async (req,res) => {
    try {
        const employees = await Employee.find();

        if (employees.length == 0) {
            return res.status(404).json({
                success: false,
                message: 'No employees data.'
            })
        }

        res.json({
            success: true,
            message: 'Successfully get all employees data.',
            data: employees.map( employee => ({
                id: employee.id,
                name: employee.name,
                department: employee.department
            }))
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error: error.message
        })
    }
})

router.get('/:id', async (req,res) => {
    try {
        const employee = await Employee.findOne({id: req.params.id});

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found.'
            })
        }

        res.json({
            success: true,
            message: 'Successfully get employee data.',
            data: {
                id: employee.id,
                name: employee.name,
                department: employee.department
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error: error.message
        })
    }
})

router.post('/', async (req,res) => {
    try {
        const {id, name, department} = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required!'
            })
        } else if(!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required!'
            })
        } else if(!department){
            return res.status(400).json({
                success: false,
                message: 'Department is required!'
            })
        }

        const idExist = await Employee.findOne({id})

        if(idExist){
            return res.status(409).json({
                success: false,
                message: 'Employee ID already exist.'
            })
        }

        const employee = new Employee({
            id, name, department
        })

        const savedEmployee = await employee.save()

        res.status(200).json({
            success: true,
            message: 'Employee added successfully.'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error: error.message
        })
    }
})

router.put('/:id', async (req,res) => {
    try {
        const {name, department} = req.body;

        if(!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required!'
            })
        } else if(!department){
            return res.status(400).json({
                success: false,
                message: 'Department is required!'
            })
        }

        const updatedEmployee = await Employee.findOneAndUpdate(
            {id: req.params.id},
            {name, department},
            {new: true, runValidators: true}
        )

        if(!updatedEmployee){
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Employee updated successfully.'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error: error.message
        })
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const deletedEmployee = await Employee.findOneAndDelete({id: req.params.id})

        if(!deletedEmployee){
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Employee deleted successfully.'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:'Internal Server Error',
            error: error.message
        })
    }
})

module.exports = router