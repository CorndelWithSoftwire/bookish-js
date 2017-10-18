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
}