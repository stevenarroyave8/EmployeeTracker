CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT, 
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);


INSERT INTO department(name)
VALUES ("sales"),
      ("engineering"),
       ("finance"),
       ("legal");


INSERT INTO role(title, salary,department_id)
VALUES ("salesperson",80.000,1),
       ("lead sales",110.000,1), 
       ("lead engineer", 150.000,2),
       ("software engineer", 120.000,2),
       ("accountant", 125.000,3),
       ("account manager", 160.000,3),
       ("legal team lead",250.000,4),
       ("lawyer",190.000,4);
       

INSERT INTO employee(first_name, last_name,role_id,manager_id)
VALUES ("John","Doe",2,NULL),
       ("Jane","Doe",1,2),
       ("Samuri","Jack",3,NULL),
       ("Ash","Ketchup",4,3), 
       ("Jason","Born",6,NULL),
       ("The","Rock",5,6),
       ("Dwayne","Johnson",7,NULL),
       ("Mike","Wazowski",8,7);