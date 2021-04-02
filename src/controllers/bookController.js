import BookRepository from '../repositories/bookRepository';

import express from 'express';

class BookController {
    constructor() {
        this.bookRepository = new BookRepository();
        this.router = express.Router();
        this.router.get('/', (request, response) => this.getAllBooks(request, response) );
    }

    getAllBooks(request, response) {
        // authenticated user passed on by passport
        console.log( "User: " +  ( ('user' in request) ? JSON.stringify(request.user) : "unknown" )  );
        this.bookRepository.getAllBooks()
            .then(books => {
                response.status(200).send(books);
            });
    }
}

export default new BookController().router;
