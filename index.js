// Import and require inquirer
const inquirer = require('inquirer');
//Import inquirer questions class
const Questions = require('./lib/Questions');
const questions = new Questions;
//Create database instance and get connection
const Database = require("./lib/Database");
const database = new Database;
const db = database.connection;
// Import and require console.table
const cTable = require('console.table');


async function prompter(action, questionList) {

  const queries = database.getQueries();

  let data = [];
  let rows;
  let obj = {};
  let response;

  if (action === 'options' || questionList === "" || questionList === undefined) {
    questionList = questions.getQuestion('options');
  }

  if (questionList != "" && questionList != undefined) {

    const answers = await inquirer
      .prompt(questionList)
      .then((answers) => {
        return answers;
      })
      .catch((error) => {
        console.log(error);
      });

    if (answers.options) {
      switch (answers.options) {
        case ("View Departments"):
        case ("View Roles"):
        case ("View Employees"):

          let option = answers.options.split(" ")[1];
          rows = await database.runQuery(`list${option}`, "");

          console.log(`\nList of ${option}`);
          console.table(rows);
          prompter('options');

          break;
        case "Add Department":
          questionList = questions.getQuestion('createDepartment');
          console.log("Add a new department...");
          prompter('createDepartment', questionList);
          break;

        case "Add Role":
          //Get list of departments for question
          rows = await database.runQuery('listDepartments', "");

          rows.forEach(element => {
            obj = { name: element['Department Name'], value: element['Id'] };
            data.push(obj);
          });

          questionList = questions.getQuestion('createRole', data);
          console.log("Add a new role...");
          prompter('createRole', questionList);

          break;

        case "Add Employee":
          //Get list of roles for question
          data = [];
          data[0] = [];
          data[1] = [];

          rows = await database.runQuery('listRoles', "");
          rows.forEach(element => {
            obj = { name: element['Job Title'], value: element['Id'] };
            data[0].push(obj);
          });

          rows = await database.runQuery('listEmployees', "");
          rows.forEach(element => {
            obj = { name: (element['First Name'] + " " + element['Last Name']), value: element['Id'] };
            data[1].push(obj);
          });
          obj = { name: 'None', value: null };
          data[1].push(obj);

          questionList = questions.getQuestion('createEmployee', data);
          console.log("Add a new employee...");
          prompter('createEmployee', questionList);

          break;

        case "Update Employee Role":
          data = [];
          data[0] = [];
          data[1] = [];

          rows = await database.runQuery('listRoles', "");
          rows.forEach(element => {
            obj = { name: element['Job Title'], value: element['Id'] };
            data[0].push(obj);
          });

          rows = await database.runQuery('listEmployees', "");
          rows.forEach(element => {
            obj = { name: (element['First Name'] + " " + element['Last Name']), value: element['Id'] };
            data[1].push(obj);
          });
          obj = { name: 'None', value: null };
          data[1].push(obj);

          questionList = questions.getQuestion('updateEmployeeRole', data);
          console.log("Update an employee...");
          prompter('updateEmployeeRole', questionList);

          break;

        case "Exit":
          console.log("Goodbye!");
          process.exit(0);
          break;

        default:
          prompter('options');
          break;
      }
    } else {
      switch (action) {
        case "createDepartment":

          response = await database.runQuery(`createDepartment`, [answers.departmentName]);

          if (response['affectedRows'] > 0) {
            console.log(`Department ${answers.departmentName} added.\n`);
          }

          prompter('options');

          break;
        case "createRole":

          response = await database.runQuery(`createRole`, [answers.roleName, answers.roleSalary, answers.departmentChoice]);
          if (response['affectedRows'] > 0) {
            console.log(`Role ${answers.roleName} added.\n`);
          }
          prompter('options');

          break;
        case "createEmployee":
          response = await database.runQuery(`createEmployee`, [answers.firstName, answers.lastName, answers.roleChoice, answers.mgrChoice]);
          if (response['affectedRows'] > 0) {
            console.log(`Employee ${answers.firstName} ${answers.lastName} updated.\n`);
          }
          prompter('options');

          break;
        case "updateEmployeeRole":
          response = await database.runQuery(`updateEmployeeRole`, [answers.roleChoice, answers.employee]);
          if (response['affectedRows'] > 0) {
            console.log(`Employee updated.\n`);
          }
          prompter('options');

          break;

        default:
          break;
      }
    }
  } else {
    console.log("No question list defined. Reseting...");
    prompter('options');
  }

}

prompter('options');
// test();
