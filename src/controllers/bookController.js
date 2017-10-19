import Book from '../models/book';

import express from 'express';
import passport from 'passport';

class BookController {
    constructor() {
        this.router = express.Router();
        this.router.get('/', passport.authenticate('jwt', {session: false}), this.getAllBooks.bind(this));
        this.router.get('/:id', passport.authenticate('jwt', {session: false}), this.getBook.bind(this));
        this.router.post('/', passport.authenticate('jwt', {session: false}), this.addBook.bind(this));
    }

    getAllBooks(request, response) {
        Book.findAll()
            .then(books => {
                response.status(200).send(books);
            })
            .catch(error => BookController.errorResponse(response, error));
    }

    getBook(request, response) {
        const id = request.params.id;
        Book.findById(id)
            .then(book => {
                if (!book) {
                    return response.status(404).send({errors: ['Could not find book with id ' + id]})
                }
                response.status(200).send(book);
            })
            .catch(error => BookController.errorResponse(response, error));
    }

    addBook(request, response) {
        const book = BookController.getBookFromRequest(request);
        if (!book) {
            return response.status(400).send({ errors: ['Invalid book']});
        }
        Book.create(book)
            .then(() => {
                response.status(200).send({success: true, message: 'Book added successfully'});
            })
            .catch(error => BookController.errorResponse(response, error));
    }

    static errorResponse(response, error) {
        response.status(500).send({ errors: [error.message]})
    }

    static getBookFromRequest(request) {
        console.log(request.body);
        const title = request.body.title;
        const author = request.body.author;
        const isbn = request.body.isbn;
        if (!title || !author) {
            return null;
        }
        return {title: title, author: author, isbn: isbn};
    }
}

export default new BookController().router;
