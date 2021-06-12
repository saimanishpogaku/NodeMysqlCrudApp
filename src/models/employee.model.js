'use strict';
var dbConn = require('./../../config/db.config');

//Employee object create
class Employee {
    constructor(employee = {}) {
        this.first_name = employee.first_name ? employee.first_name : null;
        this.last_name = employee.last_name ? employee.last_name : null;
        this.email = employee.email ? employee.email : null;
        this.phone = employee.phone ? employee.phone : null;
        this.organization = employee.organization ? employee.organization : null;
        this.designation = employee.designation ? employee.designation : null;
        this.salary = employee.salary ? employee.salary : 10000;
        this.status = employee.status ? employee.status : 1;
        this.created_at = new Date();
        this.updated_at = new Date();
    }

    async create(newEmp, result) {
        let response = null;

        try {
            response = await dbConn.promise().query("INSERT INTO employees set ?", newEmp);
            console.log(response);
            result(null, response);
        } catch (error) {
            console.log(error);
            result(error, null);
        }
    }

    static async findById(id, result) {
        let response = null;
        try {
            response = await dbConn.promise().query("Select * from employees where id = ? ", id);
            result(null, response[0]);
        } catch (error) {
            result(error, null);
        }
        return response;
    }

    static async findAll(result) {
        let response = null;

        try {
            let [rows, fields] = await dbConn.promise().query("SELECT * FROM employees");
            response = rows;
            result(null, response);
        } catch (error) {
            console.log(error);
            result(error, null);
        }
    }

    async update(id, employee, result) {
        let response = null;
        try {
            response = await dbConn.promise().query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name, employee.last_name, employee.email, employee.phone, employee.organization, employee.designation, employee.salary, id]);
            result(null, response[0]);
        } catch (error) {
            result(error, null);
        }

    }

    static async delete(id, result) {
        let response = null;
        try {
            response = await dbConn.promise().query("DELETE FROM employees WHERE id = ?", [id]);
            result(null, response[0]);
        } catch (error) {
            result(error, null);
        }
    }
}

module.exports = Employee;