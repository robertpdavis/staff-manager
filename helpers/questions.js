
const questions = {};

questions['options'] = [
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Departments',
            'View Roles',
            'View Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee',
            'Exit'
        ],
        name: 'options',
        //validate input
        validate(answer) {
            if (answer === "")
                return "You must select a an options from the list.";
            else {
                return true;
            }
        },
    }
];

questions['createDepartment'] = [
    {
        type: 'input',
        message: 'Enter in the name of the department.',
        name: 'departmentName',
        //validate input
        validate(answer) {
            if (answer === "")
                return "You must enter a name for the department.";
            else {
                return true;
            }
        },
    }
];

questions['createDepartment'] = [
    {
        type: 'input',
        message: 'Enter in the name of the department.',
        name: 'departmentName',
        //validate input
        validate(answer) {
            if (answer === "")
                return "You must enter a name for the department.";
            else {
                return true;
            }
        },
    }
];

module.exports = questions;