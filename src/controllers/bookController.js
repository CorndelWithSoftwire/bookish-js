import BookRepository from '../repositories/bookRepository.js';
import Book from '../models/book.js';
import express from 'express';

class BookController {
    constructor() {
        this.bookRepository = new BookRepository();
        this.router = express.Router();
        this.router.get('/', (request, response) => this.getAllBooks(request, response) );
        this.router.get('/:id', (request, response, next) => this.getBook(request, response, next) );
        this.router.post('/', (request, response) => this.addBook(request, response) );
    }

    async getAllBooks(request, response) {
      
        let books = await this.bookRepository.getAllBooks()
         
        response.status(200).send(books);
        // TODO add error handling
    }

    async getBook(request, response, next) {
        const id = request.params.id;
        // TODO use id to get one book from repository
        
        response.status(500).send("getBook not implemented");
    }

    addBook(request, response) {
        response.status(500).send("getBook not implemented");
       // TODO ask repository to add book and get its id
    }

    static errorResponse(response, error) {
        response.status(500).send({ errors: [error.message]})
    }

    static getBookFromRequest(request) {

        if ( request.body &&
             'title' in request.body &&
             'author' in request.body
        ) {
            const title = request.body.title;
            const author = request.body.author;
            const isbn = ( 'isbn' in request.body) ? request.body.isbn : null;
               
            // id is generated by db, so currently unknown
            const book =  new Book(null, title, author, isbn);
            console.log ("book to add " + JSON.stringify(book) );
            return book;
        } else {
            return null;
        }
    }


}

export default new BookController().router;
