import Repository from './repository';
import Book from '../models/book';

export default class BookRepository extends Repository {
    getAllBooks() {
        return this.db.query('SELECT * FROM books')
            .then(books => {
                return books.map(book => {
                    return new Book(book.id, book.title, book.author, book.isbn);
                })
            });
    }

    getBookById(id) {
        return this.db.one('SELECT * FROM books WHERE id = $1', id)
            .then(book => {
                return new Book(book.id, book.title, book.author, book.isbn);
            });
    }

    addBook(book) {
        return this.db.query('INSERT INTO books(title, author, isbn) VALUES($1, $2, $3)',
            book.title, book.author, book.isbn);
    }
}