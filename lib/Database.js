const mysql = require('mysql2');

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
            IFNULL(CONCAT(d.first_name, ', ', d.last_name),"N/A") AS Manager 
            FROM employee a 
            JOIN role b ON a.role_id = b.id 
            JOIN department c ON b.department_id = c.id 
            LEFT JOIN employee d ON a.id = d.manager_id`;

        queries['createDepartment'] =
            `INSERT INTO department (name)
            VALUES (?)`;

        return queries;
    }
}

module.exports = Database;