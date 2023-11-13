CREATE TABLE calories (
  gender varchar(10),
  age int,
  calories int,
  PRIMARY KEY (gender, age)
);

INSERT INTO calories (gender, age, calories)
VALUES
("female", 2, 1000),
("female", 4, 1300),
("female", 9, 1500),
("female", 14, 1800),
("female", 19, 1900),
("female", 31, 1800),
("female", 51, 1600),
("male", 2, 1000),
("male", 4, 1300),
("male", 9, 1800),
("male", 14, 2200),
("male", 19, 2500),
("male", 31, 2300),
("male", 51, 2100);