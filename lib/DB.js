const mysql = require('mysql2');
const cTable = require('console.table');

class DB {
    constructor() {
        const PORT = process.env.PORT || 3001;
        // Connect to database
        this.db = mysql.createConnection(
            {
                host: 'localhost',
                // MySQL username,
                user: process.env.DB_USER,
                // MySQL password
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            },
            console.log(`Connected to the staff_db database.\n`)
        );

    }

    // List employees
    listEmployees() {
        const sql =
            `SELECT
        employee.id AS Id, employee.first_name AS 'First Name', employee.last_name AS 'Last Name', 
        role.title as Title, department.name as Department, role.salary as Salary
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id`;

        this.db.query(sql, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log('List of Employees');
                console.table(results);
            }
        });
    }


}

module.exports = DB;