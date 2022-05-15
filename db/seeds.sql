INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Engineer", 90000, 1),
       ("Software Engineer", 110000,2),
       ("Accountant", 115000,3),
       ("Lawyer", 185000,4),
       ("Product Manager", 160000, 5),
       ("Account Manager", 180000, 1),
       ("Marketing Manager", 180000, 5),
       ("Senior Developer", 190000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
       ("Peter", "Baker", 6, null),
       ("Vicky", "Brown", 7, null),
       ("Rick", "Barrett", 8, null),
       ("Mike", "Smith", 1, 1),
       ("Peter", "Taylor", 5, 2),
       ("John","Porter", 2, 3);


