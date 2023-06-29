const inquirer = require('inquirer');
const consoleTable = require('console.table');
const connection = require('./db/connection');

function mainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'Add an employee',
        'Update an employee role',
        'View all roles',
        'Add a role',
        'View all departments',
        'Add a department',
        'Quit'
      ]
    }
  ]).then((answers) => {
    switch (answers.action) {
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Quit':
        console.log('Goodbye!');
        connection.end();
        break;
      default:
        console.log(`Invalid action: ${answers.action}`);
        break;
    }
  });
}
