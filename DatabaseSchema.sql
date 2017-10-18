CREATE TABLE Books (
	Id SERIAL NOT NULL PRIMARY KEY,
	Title varchar NOT NULL,
	Author varchar NULL,
	ISBN nchar(14) NULL);