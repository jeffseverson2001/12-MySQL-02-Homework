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
    inquirer.prompt([
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
    ]).then((answer) => {
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
    inquirer.prompt([{
        name: 'department',
        type: 'input',
        message: 'Enter in Department Name: ',
    }]).then((result) => {
        const query = 'INSERT INTO department (name) VALUES (?)';
        connection.query(query, [result.department], (err, res) => {
            if (err) throw err;
            //console.log(query);
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
const addEmployee = () => {
    //  Get Managers Choice Array
    let managersArray = [];
    connection.query(`SELECT CONCAT(e.first_name, ' ', e.last_name) AS name, r.id FROM employee e INNER JOIN role r ON e.role_id = r.id  WHERE r.title = 'Lead Manager'`, (err, res) => {
        res.forEach(d => {
            managersArray.push({name: d.name, value: d.id},);
        });
    }); 

    //  Get Roles Choice Array
    let rolesArray = [];
    connection.query(`SELECT title, id FROM role `, (err, res) => {
        res.forEach(r => {
            rolesArray.push({name: r.title, value: r.id},);
        });
    });
    console.log(rolesArray);

    inquirer.prompt([
        {
            name: 'employeeFirst',
            type: 'input',
            message: 'Enter in Employee First Name: ',
        },
        {
            name: 'employeeLast',
            type: 'input',
            message: 'Enter in Employee Last Name: ',
        },
        {
            name: 'employeeRole',
            type: 'list',
            message: 'Enter in Employee Role: ',
            choices: rolesArray,
        },
        {
            name: 'employeeManager',
            type: 'list',
            message: 'Select Reporing Manager',
            choices: managersArray,
        },
    ]).then((result) => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        connection.query(query, [result.employeeFirst, result.employeeLast, result.employeeRole, result.employeeManager], (err, res) => {
            if (err) throw err;
            //console.log(query);
            console.log(`New Employee ${result.department} Entered`);
            mainList();
        });
    });
};

const viewEmployee = () => {
    connection.query(`SELECT id, first_name, last_name, CONCAT(first_name, ' ', last_name) AS name FROM employee`, (err, res) => {
        console.table(res);
        mainList();
    });
};


//  Role Functions
const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter in Role Title: ',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter in Salary for Role: ',
            validate(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            },
        }
    ]).then((result) => {
        const query = 'INSERT INTO role (title, salary) VALUES (?, ?)';
        connection.query(query, [result.title, result.salary], (err, res) => {
            if (err) throw err;
            //console.log(query);
            console.log(`New Role ${result.title} Entered`);
            mainList();
        });
    });
};

const viewRole = () => {
    connection.query('SELECT id, title, salary FROM role', (err, res) => {
        console.table(res);
        mainList();
    });
};

