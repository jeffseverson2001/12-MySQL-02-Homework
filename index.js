const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'taco',
    database: 'employee_DB',
});

connection.connect((err) => {
    if (err) throw err;
    mainList();
});

//  Inquirer Questions
function mainList() {
    inquirer.prompt(
        {
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Add a Department',
                'Add an Employee',
                'Add a Role',
                'View Departments',
                'View Employees',
                'View Roles',
            ],
        }
    ).then((answer) => {
        switch (answer.action) {
            case 'Add a Department':
                addDepartment();
                break;

            case 'Add an Employee':
                addEmployee();
                break;

            case 'Add a Role':
                addRole();
                break;

            case 'View Departments':
                viewDepartment();
                break;

            case 'View Employees':
                viewEmployee();
                break;

            case 'View Roles':
                viewRole();
                break;

            default:
                console.log(`Invalid choice: ${answer.action}`);
                break;
        }
    }
    )
};

//  Department Functions
const addDepartment = () => {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'Enter in Department Name: ',
    }).then((result) => {
        const query = 'INSERT INTO department (name) VALUES (?)';
        connection.query(query, [result.department], (err, res) => {
            if (err) throw err;
            console.log(query);
            console.log(`New Department ${result.department} Entered`);
            mainList();
        });
    });
};

const viewDepartment = () => {
    connection.query('SELECT id, name FROM department', (err, res) => {
        console.table(res);
        mainList();
    });
};


//  Employee Functions



//  Role Functions
