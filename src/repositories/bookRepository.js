import Repository from './repository';
import Book from '../models/book';

export default class BookRepository extends Repository {
    getAllBooks() {
        return this.run('SELECT * FROM books')
            .then(result => {
                let books = result.recordsets[0];
                return books.map(book => {
                    return new Book(book.id, book.title, book.author, book.isbn);
                });
            });
    }

}
