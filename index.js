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

function viewAllEmployees() {
  connection.query(
    'SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees managers ON employees.manager_id = managers.id;',
    (err, results) => {
      if (err) throw err;
      console.table(results);
      mainMenu();
    }
  );
}

function addEmployee() {
    // Gets a list of the roles
    connection.query('SELECT * FROM roles', (err, roles) => {
      if (err) throw err;
 
      // Gets a list of the employees to select a manager from
      connection.query('SELECT * FROM employees', (err, employees) => {
        if (err) throw err;
 
        inquirer.prompt([
          {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name:"
          },
          {
            type: 'input',
            name: 'last_name',
            message: "Enter the employee's last name:"
          },
          {
            type: 'list',
            name: 'role_id',
            message: "Select the employee's role:",
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id
            }))
          },
          {
            type: 'list',
            name: 'manager_id',
            message: "Select the employee's manager:",
            choices: [
              { name: 'None', value: null },
              ...employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
              }))
            ]
          }
         
        ]).then((answers) => {
          connection.query(
            'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [answers.first_name, answers.last_name, answers.role_id, answers.manager_id],
            (err, results) => {
              if (err) throw err;
              console.log(`Employee ${answers.first_name} ${answers.last_name} was added successfully!`);
              mainMenu();
            }
          );
        });
      });
    });
  }
  function updateEmployeeRole() {
    // Gets a list of the employees
    connection.query('SELECT * FROM employees', (err, employees) => {
      if (err) throw err;


      inquirer.prompt([
        {
          type: 'list',
          name: 'employees_id',
          message: 'Which employee would you like to update?',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }))
        },
        {
          type: 'input',
          name: 'roles_id',
          message: 'Enter the ID of the new role:'
        }
      ]).then((answers) => {
        connection.query(
          'UPDATE employees SET role_id = ? WHERE id = ?',
          [answers.roles_id, answers.employees_id],
          (err, results) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            mainMenu();
          }
        );
      });
    });
  }
 


  function viewAllRoles() {
    connection.query(
      'SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id ORDER BY roles.id',
      (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
      }
    );
  }
 
 
  function addRole() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of the new role:'
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the new role:'
      }
    ]).then((answers) => {
      connecton.query(
        'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
        [answers.title, answers.salary, answers.department_id],
        (err, results) => {
          if (err) throw err;
          console.log(`Role ${answers.title} was added successfully!`);
          mainMenu();
        }
      );
    });
  }  


  function viewAllDepartments() {
    connection.query(
      'SELECT * FROM departments',
      (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
      }
    );
  }
 


function addDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:'
      }
    ]).then((answers) => {
      connection.query(
        'INSERT INTO departments (name) VALUES (?)',
        [answers.name],
        (err, results) => {
          if (err) throw err;
          console.log(`Departments ${answers.name} was added successfully!`);
          mainMenu();
        }
      );
    });
  }


mainMenu();
