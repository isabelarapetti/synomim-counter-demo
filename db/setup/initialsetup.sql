-- CREATE DATABASE synonims_db;

USE synonims_db;

CREATE TABLE activity (
  id INT PRIMARY KEY AUTO_INCREMENT,
  text varchar(255) NOT NULL,
  analysis varchar(255) NOT NULL
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ''; 
flush privileges;