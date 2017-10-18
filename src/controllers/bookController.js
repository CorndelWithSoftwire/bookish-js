import BookRepository from '../repositories/bookRepository';

import express from 'express';
import passport from 'passport';

class BookController {
    constructor() {
        this.bookRepository = new BookRepository();
        this.router = express.Router();
        this.router.get('/', passport.authenticate('jwt', {session: false}), this.getAllBooks.bind(this));
    }

    getAllBooks(request, response) {
        this.bookRepository.getAllBooks()
            .then(books => {
                response.status(200).send(books);
            });
    }
}

export default new BookController().router;
