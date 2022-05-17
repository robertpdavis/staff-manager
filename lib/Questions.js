
class Questions {

    getQuestion(question, data) {

        var questions = "";

        switch (question) {
            case 'options':
                return [
                    {
                        type: 'list',
                        message: 'What would you like to do?',
                        choices: [
                            'View Departments',
                            'View Roles',
                            'View Employees',
                            'View Employees By Manager',
                            'View Employees By Department',
                            "View Department Budget",
                            'Add Department',
                            'Add Role',
                            'Add Employee',
                            'Update Employee Role',
                            'Update Employee Manager',
                            'Delete Department',
                            'Delete Role',
                            'Delete Employee',
                            'Exit'
                        ],
                        name: 'options',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        },
                    }
                ];
                break;
            case 'selectManager':
                return [
                    {
                        type: 'list',
                        message: 'Select a manager from the list:',
                        choices: data,
                        name: 'mgrChoice',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        },
                    }
                ];
                break;
            case 'selectDepartment':
                return [
                    {
                        type: 'list',
                        message: 'Select a department from the list:',
                        choices: data,
                        name: 'departmentChoice',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        },
                    }
                ];
                break;
            case 'createDepartment':
                return [
                    {
                        type: 'input',
                        message: 'Enter in the name of the new department:',
                        name: 'departmentName',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must provide a new department name.";
                            else {
                                return true;
                            }
                        },
                    }
                ];
                break;
            case 'createRole':
                return [
                    {
                        type: 'input',
                        message: 'Enter in the name of the new role:',
                        name: 'roleName',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must provide a new role name.";
                            else {
                                return true;
                            }
                        },
                    },
                    {
                        type: 'input',
                        message: 'Enter in the salary of the new role:',
                        name: 'roleSalary',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must provide a salary.";
                            else {
                                return true;
                            }
                        },
                    },
                    {
                        type: 'list',
                        message: 'Select a department from the list:',
                        choices: data,
                        name: 'departmentChoice',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        },
                    }
                ];
                break;
            case 'createEmployee':
                return [
                    {
                        type: 'input',
                        message: "Enter in the employee's first name:",
                        name: 'firstName',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must provide the new employee's first name.";
                            else {
                                return true;
                            }
                        },
                    },
                    {
                        type: 'input',
                        message: "Enter in the employee's last name:",
                        name: 'lastName',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must provide the new employee's last name.";
                            else {
                                return true;
                            }
                        },
                    },
                    {
                        type: 'list',
                        message: "Select a employee's role from the list:",
                        choices: data[0],
                        name: 'roleChoice',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        },
                    },
                    {
                        type: 'list',
                        message: "Select a employee's manager from the list:",
                        choices: data[1],
                        name: 'mgrChoice',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        },
                    }
                ];
                break;

            case 'updateEmployeeRole':
                return [
                    {
                        type: 'list',
                        message: "Select an employee from the list:",
                        choices: data[1],
                        name: 'employee',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        },
                    },
                    {
                        type: 'list',
                        message: "Select the employee's role from the list:",
                        choices: data[0],
                        name: 'roleChoice',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        },
                    }
                ];
                break;
            case 'updateEmployeeMgr':
                return [
                    {
                        type: 'list',
                        message: "Select an employee from the list:",
                        choices: data[1],
                        name: 'employee',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        },
                    },
                    {
                        type: 'list',
                        message: "Select the employee's manager from the list:",
                        choices: data[0],
                        name: 'mgrChoice',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        },
                    }
                ];
                break;
            case 'deleteDepartment':
            case 'deleteRole':
            case 'deleteEmployee':
                let selection = question.substr(6).toLowerCase();
                let message = `Select a ${selection} to delete from the list:`;
                return [
                    {
                        type: 'list',
                        message: message,
                        choices: data,
                        name: 'selection',
                        //validate input
                        validate(answer) {
                            if (answer === "")
                                return "You must select an option from the list.";
                            else {
                                return true;
                            }
                        }
                    },
                    {
                        type: 'confirm',
                        message: `Are you sure you wish to delete ${selection}?`,
                        name: 'delete'
                    }
                ];
                break;
            default:
                break;
        }
    }


}

module.exports = Questions;