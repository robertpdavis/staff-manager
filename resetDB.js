const Database = require("./lib/Database");
const database = new Database;
const db = database.connection;

const sql = `
DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
  );

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY ( department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Engineer", 90000, 1),
       ("Software Engineer", 110000,2),
       ("Accountant", 115000,3),
       ("Lawyer", 185000,4),
       ("Product Manager", 160000, 5),
       ("Account Manager", 180000, 1),
       ("Marketing Manager", 180000, 5),
       ("Senior Developer", 190000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
       ("Peter", "Baker", 6, null),
       ("Vicky", "Brown", 7, null),
       ("Rick", "Barrett", 8, null),
       ("Mike", "Smith", 1, 1),
       ("Peter", "Taylor", 5, 2),
       ("John","Porter", 2, 3);
`;

async function runQuery(sql) {
    const rows = await db
        .then(conn => conn.query(sql))
        .then(([rows, fields]) => {
            return rows;
        })
        .catch(err => {
            console.log(err);
        });
    return response;
}

console.log(runQuery(sql));