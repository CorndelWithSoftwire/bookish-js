import {executeSql} from '../helpers/dbHelper.js';
import Book from '../models/book.js';

export default class BookRepository {
    getAllBooks() {
      throw "book repository all books query not yet implemented"
      // TODO implement
    }

    async getBookById(id) {
        console.log("get book " + id);
        let result = await executeSql('SELECT * FROM books WHERE id = @bookid', { 'bookid' : id} )
            
        let books = result.recordset;
        if ( books.length < 1) {
            return null;
        }
                     
        let book = books[0];
        return new Book(book.id, book.title, book.author, book.isbn);
        
    }

    addBook(book) {
        throw "add book not implemented"
        //TODO implement, need to find id of inserted book
    }


}
