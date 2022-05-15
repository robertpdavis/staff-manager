// Import and require inquirer
const inquirer = require('inquirer');
// Import and require dotenv
require('dotenv').config();
//Get questions for inquirer
const questions = require('./helpers/questions');
//Create database instance and get connection
const Database = require("./lib/Database");
const database = new Database;
const db = database.connection;
// Import and require console.table
const cTable = require('console.table');

function prompter(choice) {

  const queries = database.getQueries();
  var question;

  //Determine inquirer quesiton list
  switch (choice) {
    case 'options':
      question = questions.options
      break;
    case 'createDepartment':
      question = questions.createDepartment
      break;
    case 'createRole':
      question = questions.createRole
      break;
    case 'createEmployee':
      question = questions.createEmployee
      break;
    case 'updateEmployee':
      question = questions.updateEmployee
      break;
    default:
      question = "";
      return;
      break;
  }

  if (question != "" && question != undefined) {
    inquirer
      .prompt(question)
      .then((answers) => {
        //Default question list answer
        if (answers.options) {
          switch (answers.options) {
            case "View Departments":
              sql = `SELECT a.id AS Id, a.name AS 'Department Name' FROM department a`;
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
              console.log("Add Department");
              prompter('createDepartment');
              break;
            case "Add Role":
              console.log("Add Role");
              prompter('createRole');
              break;
            case "Add Employee":
              console.log("Add Employee");
              prompter('createEmployee');
              break;
            case "Update Employee":
              console.log("Update Employee");
              prompter('updateEmployee');
              break;
            case "Exit":
              process.exit(0);
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
