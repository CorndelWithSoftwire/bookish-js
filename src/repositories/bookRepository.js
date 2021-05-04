const dbHelper = require('../helpers/dbHelper');

const Book = require('../models/book');
const sequential = require('promise-sequential');



class BookRepository {
    constructor() { this.type = "BookRepository" }

    getAllBooks() {
        return dbHelper.executeSql('SELECT * FROM books')
            .then(result => {
                let books = result.recordsets[0];
                return books.map(book => {
                    return new Book(book.id, book.title, book.author, book.isbn);
                });
            });
    }

    getBookById(id) {
        console.log("get book " + id);
        return dbHelper.executeSql('SELECT * FROM books WHERE id = @bookid', { 'bookid': id })
            .then(result => {
                let books = result.recordsets[0];
                if (books.length < 1) {
                    return null;
                }

                let book = books[0];
                return new Book(book.id, book.title, book.author, book.isbn);
            });
    }

    // add book and single copy
    addBook(book) {

        return dbHelper.beginTransaction().then(
            transaction => {
                return insertBook(transaction, book).then(
                    (insertBookRes) => {
                        let insertCopyPromises = [];
                        for (let i = 0; i < book.copies; i++) {
                            // need to insert copies sequentially, async/await pattern would be better
                            insertCopyPromises.push(() => insertCopy(transaction, insertBookRes.id));
                            // if testing can force FK error insertCopy(transaction, 888888); 
                        }
                        return sequential(insertCopyPromises);
                    }
                ).then(
                    (insertRes) => {
                        transaction.commit();
                        return insertRes;
                    }
                ).catch(e => {
                    transaction.rollback().then(
                        () => console.log("Rolled-back transaction after " + e)
                    ).catch(
                        (e) => console.log("Error rolling back transaction " + e)
                    );
                    throw e;
                });
            }

        ).catch(
            e => {
                console.log("Add book error: " + e)
                throw e;
            }
        );

    }
}

// book insert in scope of transaction
// returns promise that will resolve to id of inserted book
function insertBook(transaction, book) {

    return dbHelper.executeSqlInTransaction(transaction, 'INSERT INTO books(title, author, isbn) OUTPUT INSERTED.id VALUES(@title, @author, @isbn)', { 'title': book.title, 'author': book.author, 'isbn': book.isbn }).then(
        result => {
            console.log("Inserted: " + JSON.stringify(result));
            let insertOutputRows = result.recordsets[0];
            if (insertOutputRows.length < 1) {
                console.log("no rows ");
                return null;
            }

            return { "id": insertOutputRows[0].id };
        }
    );
}


// copy insert in scope of transaction 
// returns promise that will resolve to object containing bookid and copy id 
// caller responsible for committing transaction
function insertCopy(transaction, bookId) {
    return dbHelper.executeSqlInTransaction(transaction, 'INSERT INTO copies(bookId) OUTPUT INSERTED.id, INSERTED.bookId VALUES(@bookId)', { 'bookId': bookId }).then(
        result => {
            console.log("Inserted copy: " + JSON.stringify(result));
            let insertOutputRows = result.recordsets[0];
            if (insertOutputRows.length < 1) {
                console.log("no rows ");
                return null;
            }

            return { "bookId": insertOutputRows[0].bookId, "copyId": insertOutputRows[0].id };
        }
    );
}

module.exports = BookRepository;