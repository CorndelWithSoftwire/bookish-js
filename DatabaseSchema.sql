CREATE TABLE books (
	id SERIAL NOT NULL PRIMARY KEY,
	title varchar NOT NULL,
	author varchar NULL,
	isbn nchar(14) NULL -- ISBNs are 10 or 13 characters, but are sometimes written with a "-" after the first 3 digits so we allow 14 characters
);

CREATE TABLE copies (
	id SERIAL NOT NULL PRIMARY KEY, -- This is used as the barcode, which will be printed and stuck on the book copy
	bookid int,
	borrower varchar NULL, -- Only set if the book is borrowed
	duedate timestamp without time zone NULL -- Only set if the book is borrowed
);

ALTER TABLE copies ADD CONSTRAINT fk_copies_book FOREIGN KEY (bookid) REFERENCES books (id);