'use strict';
const Employee = require('../models/employee.model');

exports.findAll = function (req, res) {
    Employee.findAll(function (err, employee) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', employee);
        res.status(200).json(employee);
    });
};
exports.create = async function (req, res) {
    const new_employee = new Employee(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        await new_employee.create(new_employee, function (err, employee) {
            console.log(employee);
            if (err)
                res.send(err);
            if (employee[0].insertId) {
                res.json({ error: false, message: "Employee added successfully!", data: employee });
            } else {
                res.json({ error: false, message: "Employee can't be registered at this movement!", data: employee });
            }

        });
    }
};
exports.findById = async function (req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
};
exports.update = function (req, res) {
    const update_employee = new Employee(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Employee.findById(req.params.id, function (err, employee) {
            console.log(employee); //return res.json([]);
            if (err)
                res.send(err);
            if (employee.length <= 0) {
                res.status(400).json({ error: true, message: 'Employee does not exists' });
            } else {
                update_employee.update(req.params.id, new Employee(req.body), function (err, employee) {
                    if (err) {
                        res.send(err);
                    } else {
                        if (employee.affectedRows) {
                            res.json({ error: false, message: 'Employee successfully updated', data: employee });
                        } else {
                            res.json({ error: false, message: 'Employee update failed', data: employee });
                        }
                    }

                });
            }
        });
    }
};
exports.delete = function (req, res) {
    Employee.delete(req.params.id, function (err, employee) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Employee successfully deleted' });
    });
};