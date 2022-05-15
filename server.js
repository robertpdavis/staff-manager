// Import and require inquirer
const inquirer = require('inquirer');
// Import and require dotenv
require('dotenv').config();
//Import inquirer questions class
const InqQuestions = require('./lib/InqQuestions');
const questions = new InqQuestions;
//Create database instance and get connection
const Database = require("./lib/Database");
const database = new Database;
const db = database.connection;
// Import and require console.table
const cTable = require('console.table');

function prompter(action, questionList) {

  const queries = database.getQueries();
  var data;

  if (action === 'options' || questionList === "" || questionList === undefined) {
    questionList = questions.getQuestion('options');
  }

  if (questionList != "" && questionList != undefined) {
    inquirer
      .prompt(questionList)
      .then((answers) => {

        if (answers.options) {
          switch (answers.options) {
            case "View Departments":
              db.query(queries['listDepartments'], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('\nList of Departments');
                  console.table(results);
                  prompter('options');
                }
              });
              break;
            case "View Roles":
              db.query(queries['listRoles'], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('\nList of Roles');
                  console.table(results);
                  prompter('options');
                }
              });
              break;
            case "View Employees":
              db.query(queries['listEmployees'], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('\nList of Employees');
                  console.table(results);
                  prompter('options');
                }
              });
              break;
            case "Add Department":
              questionList = questions.getQuestion('createDepartment');
              console.log("Add a new department...");
              prompter('createDepartment', questionList);
              break;
            case "Add Role":
              //Get list of departments for question
              db.query(queries['listDepartments'], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  data = [];
                  results.forEach(element => {
                    const obj = { name: element['Department Name'], value: element['Id'] };
                    data.push(obj);
                  });
                  questionList = questions.getQuestion('createRole', data);
                  console.log("Add a new role...");
                  prompter('createRole', questionList);
                }
              });
              break;
            case "Add Employee":
              //Get list of roles for question
              data = [];
              data[0] = [];
              data[1] = [];

              db.query(queries['listRoles'], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  results.forEach(element => {
                    const obj = { name: element['Job Title'], value: element['Id'] };
                    data[0].push(obj);
                  });
                }
              });
              db.query(queries['listEmployees'], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  results.forEach(element => {
                    const obj = { name: (element['First Name'] + " " + element['Last Name']), value: element['Id'] };
                    data[1].push(obj);
                  });
                  const obj = { name: 'None', value: null };
                  data[1].push(obj);

                  questionList = questions.getQuestion('createEmployee', data);
                  console.log("Add a new employee...");
                  prompter('createEmployee', questionList);
                }
              });
              break;
            case "Update Employee Role":
              data = [];
              data[0] = [];
              data[1] = [];

              db.query(queries['listRoles'], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  results.forEach(element => {
                    const obj = { name: element['Job Title'], value: element['Id'] };
                    data[0].push(obj);
                  });
                }
              });
              db.query(queries['listEmployees'], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  results.forEach(element => {
                    const obj = { name: (element['First Name'] + " " + element['Last Name']), value: element['Id'] };
                    data[1].push(obj);
                  });
                  const obj = { name: 'None', value: null };
                  data[1].push(obj);

                  questionList = questions.getQuestion('updateEmployeeRole', data);
                  console.log("Update an employee...");
                  prompter('updateEmployeeRole', questionList);
                }
              });
              break;
            case "Exit":
              process.exit(0);
              break;
            default:
              break;
          }
        } else {
          switch (action) {
            case "createDepartment":
              db.query(queries['createDepartment'], [answers.departmentName], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Department ${answers.departmentName} added.\n`);
                  prompter('options');
                }
              });

              break;
            case "createRole":
              db.query(queries['createRole'], [answers.roleName, answers.roleSalary, answers.departmentChoice], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Role ${answers.roleName} added.\n`);
                  prompter('options');
                }
              });

              break;
            case "createEmployee":
              db.query(queries['createEmployee'], [answers.firstName, answers.lastName, answers.roleChoice, answers.mgrChoice], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Employee ${answers.firstName} ${answers.lastName} added.\n`);
                  prompter('options');
                }
              });

              break;
            case "updateEmployeeRole":
              db.query(queries['updateEmployeeRole'], [answers.roleChoice, answers.employee], function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Employee updated.\n`);
                  prompter('options');
                }
              });
              break;

            default:
              break;
          }
        }


      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("No question list defined. Reseting...");
    prompter('options');
  }

}

prompter('options');
