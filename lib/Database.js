//Use mysql2 promise.
const mysql = require('mysql2/promise');
// Import and require dotenv
require('dotenv').config();

class Database {

    constructor() {
        const PORT = process.env.PORT || 3001;
        // Connect to database
        this.connection = mysql.createConnection(
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

    //Method to return list of defined prepared queries to use in database requests.
    getQueries() {

        const queries = {};

        queries['listDepartments'] =
            `SELECT a.id AS Id, a.name AS 'Department Name' 
            FROM department a`;

        queries['listRoles'] =
            `SELECT a.id AS Id, a.title AS 'Job Title', b.name AS Deparment, a.salary AS Salary 
            FROM role a 
            JOIN department b ON a.department_id = b.id`;

        queries['listEmployees'] =
            `SELECT a.id AS Id, a.first_name AS 'First Name', a.last_name AS 'Last Name', b.title as Title, c.name as Department, b.salary as Salary, 
            IFNULL(CONCAT(d.first_name, ' ', d.last_name),'N/A') AS Manager 
            FROM employee a 
            JOIN role b ON a.role_id = b.id 
            JOIN department c ON b.department_id = c.id 
            LEFT JOIN employee d ON a.manager_id = d.id`;

        queries['listEmployeesByMgr'] =
            `SELECT a.id AS Id, a.first_name AS 'First Name', a.last_name AS 'Last Name', b.title as Title, c.name as Department, b.salary as Salary
            FROM employee a 
            JOIN role b ON a.role_id = b.id 
            JOIN department c ON b.department_id = c.id 
            WHERE manager_id = ?`;

        queries['listEmployeesByDept'] =
            `SELECT a.id AS Id, a.first_name AS 'First Name', a.last_name AS 'Last Name', b.title as Title, b.salary as Salary
            FROM employee a 
            JOIN role b ON a.role_id = b.id 
            JOIN department c ON b.department_id = c.id 
            WHERE c.id = ?`;

        queries['listDepartmentBudget'] =
            `SELECT SUM(salary) AS Budget
            FROM role
            WHERE department_id = ?`;

        queries['createDepartment'] = `INSERT INTO department (name) VALUES (?)`;

        queries['createRole'] =
            `INSERT INTO role (title, salary, department_id)
            VALUES (?,?,?)`;

        queries['createEmployee'] =
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES (?,?,?,?)`;

        queries['updateEmployeeRole'] =
            `UPDATE employee
            SET role_id = ?
            WHERE id = ?`;

        queries['updateEmployeeMgr'] =
            `UPDATE employee
            SET manager_id = ?
            WHERE id = ?`;

        queries['deleteItem'] =
            `DELETE FROM ?? WHERE id = ?`;

        return queries;
    }

    //Runs all database queries.
    async runQuery(query, vars) {
        const queries = this.getQueries();
        const rows = await this.connection
            .then(conn => conn.query(queries[query], vars))
            .then(([rows, fields]) => {
                return rows;
            })
            .catch(err => {
                console.log(err);
            });
        return rows;
    }
}

module.exports = Database;