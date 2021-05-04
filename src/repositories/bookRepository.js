const dbHelper = require('../helpers/dbHelper');
const Book = require('../models/book');

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

    
}


module.exports = BookRepository;