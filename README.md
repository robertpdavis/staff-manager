# staff-manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
Console node.js application that allows a user to manage employees, employee roles and departments with database storage. It uses node.js with inquirer, mysql2, dotenv and console.table packages.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Licence](#Licence)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
Node.js must be installed. The npm inquirer, mysql2, dotenv and console.table packages are also required. Firstly initialise the npm in the directory for the application by typing npm init in the console. The dependencies can be installed by typing npm install. Ensure the package.json file is included in the directory. You will need to create a new mysql database (staff_db) see db/schema.sql and can populate sample data with seeds.sql. You will also need to create a .env file for database connection details. Make sure this file is noted in .gitignore.

File structure of the application:
```md
.
├── db/                    // schema and seeds files for creating database
├── lib/                   // database class to handle mysql connection and queries as well as inquirer questions class to hold all questions    
├── .gitignore             // indicates which folders and files Git should ignore
├── index.js               // main code script to run application
├── LICENCE                // licence file 
└── package.json           
```

## Usage
Run the server application by typing node index.js in the console. A main option menu of options is then displayed:
- View Departments
- View Roles
- View Employees
- View Employees By Manager
- View Employees By Department
- View Department Budget
- Add Department
- Add Role
- Add Employee
- Update Employee Role
- Update Employee Manager
- Delete Department
- Delete Role
- Delete Employee
- Exit

Data is generally dislayed in a tabular fashion as per the View Employees example:
```md
List of Employees
Id  First Name  Last Name  Title              Department   Salary  Manager
--  ----------  ---------  -----------------  -----------  ------  ------------
1   Peter       Baker      Account Manager    Sales        180000  N/A
2   Vicky       Brown      Marketing Manager  Marketing    180000  N/A
3   Rick        Barrett    Senior Developer   Engineering  190000  N/A
4   Mike        Smith      Sales Engineer     Sales        90000   Peter Baker
5   Peter       Taylor     Product Manager    Marketing    160000  Vicky Brown
6   John        Porter     Software Engineer  Engineering  110000  Rick Barrett
7   John        Scott      IT Manager         IT           200000  N/A
```
See this video link for further details of functionality : https://drive.google.com/file/d/1Zsj2OUDYd2wnFu5_Kvia0jVLh574RGRk/view

## Credits
Rob Davis Github: [robertpdavis](https://github.com/robertpdavis)

## Licence
MIT License

## Contributing
Please contact me at: robertpdavis@optusnet.com.au

## Tests
No tests are included.

## Questions
* Github: [robertpdavis](https://github.com/robertpdavis)
* Email: robertpdavis@optusnet.com.au
