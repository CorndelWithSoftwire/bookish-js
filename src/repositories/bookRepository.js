import {executeSql} from '../helpers/dbHelper';
import Book from '../models/book';

export default class BookRepository {
    getAllBooks() {
        return executeSql('SELECT * FROM books')
            .then(result => {
                let books = result.recordsets[0];
                return books.map(book => {
                    return new Book(book.id, book.title, book.author, book.isbn);
                });
            });
    }

}
