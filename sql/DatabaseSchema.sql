

USE bookish
GO

CREATE TABLE books (
	id int IDENTITY NOT NULL PRIMARY KEY,
	title nvarchar(400) NOT NULL, -- to alow simple enforcement of uniqueness, for longer titles we would use a hash
	author nvarchar(400) NULL,
	isbn nchar(14) NULL) -- ISBNs are 10 or 13 characters, but are sometimes written with a "-" after the first 3 digits so we allow 14 characters
GO

CREATE TABLE copies (
	id int IDENTITY NOT NULL PRIMARY KEY, -- This is used as the barcode, which will be printed and stuck on the book copy
	bookid int,
	borrower nvarchar(20) NULL, -- Only set if the book is borrowed
	duedate datetime NULL -- Only set if the book is borrowed
)
GO

CREATE TABLE users (
	username nvarchar(20) NOT NULL PRIMARY KEY,
	displayname nvarchar(200) NOT NULL,
	password nvarchar(100) NOT NULL
)

GO

ALTER TABLE books ADD CONSTRAINT u_book UNIQUE(title, author, isbn); 
ALTER TABLE copies ADD CONSTRAINT fk_copies_book FOREIGN KEY (bookid) REFERENCES Books (id);
ALTER TABLE copies ADD CONSTRAINT fk_copies_users FOREIGN KEY (borrower) REFERENCES users (username);

