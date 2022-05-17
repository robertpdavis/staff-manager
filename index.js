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

//Main async loop function
async function prompter(action, questionList) {

  const queries = database.getQueries();

  let data = [];
  let rows;
  let obj = {};
  let response;
  let option;

  //Default question list to main menu options if action is 'options' or questionList blank
  if (action === 'options' || questionList === "" || questionList === undefined) {
    questionList = questions.getQuestion('options');
  }

  //Make sure we have some questions for inquirer before continuing
  if (questionList != "" && questionList != undefined) {

    //Gets answers from inquirer based on questionList
    const answers = await inquirer
      .prompt(questionList)
      .then((answers) => {
        return answers;
      })
      .catch((error) => {
        console.log(error);
      });

    //Handle main question list options via switch statement
    if (answers.options) {
      switch (answers.options) {
        //--------------------------------------------------------
        case ("View Departments"):
        case ("View Roles"):
        case ("View Employees"):
          option = answers.options.split(" ")[1];
          rows = await database.runQuery(`list${option}`, "");

          console.log(`\nList of ${option}`);
          console.table(rows);
          //Call again for main options
          prompter('options');
          break;
        //--------------------------------------------------------
        case ("View Employees By Manager"):
          //Get employee list from database for inquirer manager list selection data
          rows = await database.runQuery('listEmployees', "");
          rows.forEach(element => {
            obj = { name: (element['First Name'] + " " + element['Last Name']), value: element['Id'] };
            data.push(obj);
          });
          //Get required question for inquirer
          questionList = questions.getQuestion('selectManager', data);
          prompter('listEmployeesByMgr', questionList);
          break;
        //--------------------------------------------------------
        case ("View Employees By Department"):
          //Get department list from database for inquirer department list selection data
          rows = await database.runQuery('listDepartments', "");
          rows.forEach(element => {
            obj = { name: element['Department Name'], value: element['Id'] };
            data.push(obj);
          });
          //Get required question for inquirer
          questionList = questions.getQuestion('selectDepartment', data);
          prompter('listEmployeesByDept', questionList);
          break;
        //--------------------------------------------------------
        case ("View Department Budget"):
          //Get department list from database for inquirer department list selection data
          rows = await database.runQuery('listDepartments', "");
          rows.forEach(element => {
            obj = { name: element['Department Name'], value: element['Id'] };
            data.push(obj);
          });
          //Get required question for inquirer
          questionList = questions.getQuestion('selectDepartment', data);
          prompter('listDepartmentBudget', questionList);
          break;
        //--------------------------------------------------------
        case "Add Department":
          //Get required question for inquirer
          questionList = questions.getQuestion('createDepartment');
          console.log("Add a new department...");
          //Loop
          prompter('createDepartment', questionList);
          break;
        //--------------------------------------------------------
        case "Add Role":
          //Get department list from database for inquirer department list selection data
          rows = await database.runQuery('listDepartments', "");
          rows.forEach(element => {
            obj = { name: element['Department Name'], value: element['Id'] };
            data.push(obj);
          });
          //Get required question for inquirer
          questionList = questions.getQuestion('createRole', data);
          console.log("Add a new role...");
          //Loop
          prompter('createRole', questionList);
          break;
        //--------------------------------------------------------
        case "Add Employee":
          data = [];
          data[0] = [];
          data[1] = [];

          //Get role list from database for inquirer role list selection data
          rows = await database.runQuery('listRoles', "");
          rows.forEach(element => {
            obj = { name: element['Job Title'], value: element['Id'] };
            data[0].push(obj);
          });

          //Get employee list from database for inquirer manager list selection data
          rows = await database.runQuery('listEmployees', "");
          rows.forEach(element => {
            obj = { name: (element['First Name'] + " " + element['Last Name']), value: element['Id'] };
            data[1].push(obj);
          });
          obj = { name: 'None', value: null };
          data[1].push(obj);
          //Get required question for inquirer
          questionList = questions.getQuestion('createEmployee', data);
          console.log("Add a new employee...");
          prompter('createEmployee', questionList);
          break;
        //--------------------------------------------------------
        case "Update Employee Role":
          data = [];
          data[0] = [];
          data[1] = [];
          //Get role list from database for inquirer role list selection data
          rows = await database.runQuery('listRoles', "");
          rows.forEach(element => {
            obj = { name: element['Job Title'], value: element['Id'] };
            data[0].push(obj);
          });
          //Get employee list from database for inquirer employee list selection data
          rows = await database.runQuery('listEmployees', "");
          rows.forEach(element => {
            obj = { name: (element['First Name'] + " " + element['Last Name']), value: element['Id'] };
            data[1].push(obj);
          });
          obj = { name: 'None', value: null };
          data[1].push(obj);
          //Get required question for inquirer
          questionList = questions.getQuestion('updateEmployeeRole', data);
          console.log("Update an employee...");
          prompter('updateEmployeeRole', questionList);
          break;
        //--------------------------------------------------------
        case "Update Employee Manager":
          data = [];
          data[0] = [];
          data[1] = [];
          //Get employee list from database for inquirer employee list selection data
          rows = await database.runQuery('listEmployees', "");
          rows.forEach(element => {
            obj = { name: (element['First Name'] + " " + element['Last Name']), value: element['Id'] };
            data[0].push(obj);
          });
          //Get employee list from database again for mangager list selection data
          rows = await database.runQuery('listEmployees', "");
          rows.forEach(element => {
            obj = { name: (element['First Name'] + " " + element['Last Name']), value: element['Id'] };
            data[1].push(obj);
          });
          //Add a None to the list if no manager
          obj = { name: 'None', value: null };
          data[1].push(obj);
          //Get required question for inquirer
          questionList = questions.getQuestion('updateEmployeeMgr', data);
          console.log("Update an employee...");
          prompter('updateEmployeeMgr', questionList);
          break;
        //--------------------------------------------------------
        case ("Delete Department"):
        case ("Delete Role"):
        case ("Delete Employee"):

          //Delete a department, role or employee
          option = answers.options.split(" ")[1];
          //Get relevant table list from database for inquirer list selection data
          rows = await database.runQuery(`list${option}s`, "");
          rows.forEach(element => {
            if (option === "Department") {
              obj = { name: element['Department Name'], value: element['Id'] };
            } else if (option === "Role") {
              obj = { name: element['Job Title'], value: element['Id'] };
            } else {
              obj = { name: (element['First Name'] + ' ' + element['Last Name']), value: element['Id'] };
            }
            data.push(obj);
          });
          //Get required question for inquirer
          questionList = questions.getQuestion(`delete${option}`, data);
          console.log(`\nDelete ${option}`);
          prompter(`delete${option}`, questionList);
          break;
        //--------------------------------------------------------
        case "Exit":
          console.log("Goodbye!");
          process.exit(0);
          break;
        //--------------------------------------------------------
        default:
          //If for some unknow reason it gets here, just go back to question menu
          //Call again for main options
          prompter('options');
          break;
      }
    } else {
      //Handle specfic actions from question
      switch (action) {
        //--------------------------------------------------------
        //Display employees by selected manager
        case "listEmployeesByMgr":
          rows = await database.runQuery(`listEmployeesByMgr`, [answers.mgrChoice]);
          if (rows[0]) {
            console.log("\nList of Employees");
            console.table(rows);
          } else {
            console.log("\nNo employees managed by this person.\n");
          }
          //Call again for main options
          prompter('options');

          break;
        //--------------------------------------------------------
        //Display employees by selected department
        case "listEmployeesByDept":
          rows = await database.runQuery(`listEmployeesByDept`, [answers.departmentChoice]);
          if (rows[0]) {
            console.log("\nList of Employees");
            console.table(rows);
          } else {
            console.log("\nNo employees in this department.\n");
          }
          //Call again for main options
          prompter('options');
          break;
        //--------------------------------------------------------
        //Display budget for a selected department
        case "listDepartmentBudget":
          rows = await database.runQuery(`listDepartmentBudget`, [answers.departmentChoice]);
          if (rows[0]) {
            console.log(`\nThe departments budget = ${rows[0]['Budget']}\n`);
          } else {
            console.log("\nNo budget for this department.\n");
          }
          //Call again for main options
          prompter('options');
          break;
        //--------------------------------------------------------
        case "createDepartment":
          response = await database.runQuery(`createDepartment`, [answers.departmentName]);
          if (response['affectedRows'] > 0) {
            console.log(`Department ${answers.departmentName} added.\n`);
          } else {
            console.log(`Department add failed. If error persists, contact support.\n`);
          }
          //Call again for main options
          prompter('options');
          break;
        //--------------------------------------------------------        
        case "createRole":
          response = await database.runQuery(`createRole`, [answers.roleName, answers.roleSalary, answers.departmentChoice]);
          if (response['affectedRows'] > 0) {
            console.log(`Role ${answers.roleName} added.\n`);
          } else {
            console.log(`Role add failed. If error persists, contact support.\n`);
          }
          //Call again for main options
          prompter('options');
          break;
        //--------------------------------------------------------
        case "createEmployee":
          response = await database.runQuery(`createEmployee`, [answers.firstName, answers.lastName, answers.roleChoice, answers.mgrChoice]);
          if (response['affectedRows'] > 0) {
            console.log(`Employee ${answers.firstName} ${answers.lastName} created.\n`);
          } else {
            console.log(`Employee add failed. If error persists, contact support.\n`);
          }
          //Call again for main options
          prompter('options');
          break;
        //--------------------------------------------------------
        case "updateEmployeeRole":
          response = await database.runQuery(`updateEmployeeRole`, [answers.roleChoice, answers.employee]);
          if (response['affectedRows'] > 0) {
            console.log(`Employee updated.\n`);
          } else {
            console.log(`Employee update failed. If error persists, contact support.\n`);
          }
          //Call again for main options
          prompter('options');
          break;
        //--------------------------------------------------------
        case "updateEmployeeMgr":
          response = await database.runQuery(`updateEmployeeMgr`, [answers.mgrChoice, answers.employee]);
          if (response['affectedRows'] > 0) {
            console.log(`Employee updated.\n`);
          } else {
            console.log(`Employee update failed. If error persists, contact support.\n`);
          }
          //Call again for main options
          prompter('options');
          break;
        //--------------------------------------------------------
        //Delete code for all tables
        case 'deleteDepartment':
        case 'deleteRole':
        case 'deleteEmployee':

          if (!answers.delete) {
            console.log("Delete cancelled.\n");
          } else {
            if (answers.selection) {
              var table = action.substr(6).toLowerCase();
              response = await database.runQuery(`deleteItem`, [table, answers.selection]);
              if (response['affectedRows'] > 0) {
                console.log(`Item deleted.\n`);
              } else {
                console.log(`Delete failed. If error persists, contact support.\n`);
              }
            } else {
              console.log("No item selected to delete.\n");
            }
          }
          //Call again for main options
          prompter('options');
          break;
        //--------------------------------------------------------
        default:
          //If for some unknow reason it gets here, just go back to question menu
          prompter('options');
          break;
      }
    }
  } else {
    console.log("No question list defined. Reseting...");
    prompter('options');
  }

}

//Start main application loop
prompter('options');

