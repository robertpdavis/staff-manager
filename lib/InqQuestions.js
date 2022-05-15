
class InqQuestions {

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
                break;
            case 'createDepartment':
                return [
                    {
                        type: 'input',
                        message: 'Enter in the name of the new department.',
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




            default:
                break;
        }
    }

}

module.exports = InqQuestions;