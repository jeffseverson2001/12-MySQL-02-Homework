DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    PRIMARY KEY (id)
);

--     Add Seeds Here
--      Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jeff', 'Severson', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Google', 'Man', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Charlie', 'Smith', 3, 2);

--      Department
INSERT INTO department (name) VALUES ('Managers');
INSERT INTO department (name) VALUES ('Sales');

--      role
INSERT INTO role (title, salary) VALUES ('Lead Manager',150000.00);
INSERT INTO role (title, salary) VALUES ('Sr Developer',120000.00);
INSERT INTO role (title, salary) VALUES ('Sales Rep',50000.00);