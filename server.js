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

function prompter(choice) {

  const queries = database.getQueries();
  var questionList;
  var data;

  //Determine inquirer quesiton list
  switch (choice) {
    case 'options':
      questionList = questions.getQuestion('options');
      break;
    case 'createDepartment':
      questionList = questions.getQuestion('createDepartment');
      break;
    case 'createRole':
      //Get list of deparments
      db.query(queries['listDepartments'], function (err, results) {
        if (err) {
          console.log(err);
          return;
        }
        data = results;
      });
      questionList = questions.getQuestion('createRole', data);
      break;
    case 'createEmployee':
      questionList = questions.getQuestion('createEmployee');
      break;
    case 'updateEmployee':
      questionList = questions.getQuestion('updateEmployee');
      break;
    default:
      questionList = "";
      return;
      break;
  }

  if (questionList != "" && questionList != undefined) {
    inquirer
      .prompt(questionList)
      .then((answers) => {

        //Default question list answer
        switch (choice) {
          case 'options':
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
            break;
          case 'createDepartment':
            if (answers.departmentName != "" && answers.departmentName != undefined) {
              db.query(queries['createDepartment'], answers.departmentName, function (err, results) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(`Department ${answers.departmentName} added.\n`);
                  prompter('options');
                }
              });
            } else {
              console.log(`No department name.\n`);
              prompter('options');
            }
            break;
          case 'createRole':



            break;
          case 'createEmployee':



            break;
          case 'updateEmployee':



            break;

          default:
            return;
            break;
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
