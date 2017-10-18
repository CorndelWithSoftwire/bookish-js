import BookRepository from '../repositories/bookRepository';
import Book from '../models/book';

import express from 'express';
import passport from 'passport';
import Book from "../models/book";

class BookController {
    constructor() {
        this.bookRepository = new BookRepository();
        this.router = express.Router();
        this.router.get('/', passport.authenticate('jwt', {session: false}), this.getAllBooks.bind(this));
        this.router.get('/:id', passport.authenticate('jwt', {session: false}), this.getBook.bind(this));
        this.router.post('/', passport.authenticate('jwt', {session: false}), this.addBook.bind(this));
    }

    getAllBooks(request, response) {
        this.bookRepository.getAllBooks()
            .then(books => {
                response.status(200).send(books);
            })
            .catch(error => BookController.errorResponse(response, error));
    }

    getBook(request, response) {
        const id = request.params.id;
        this.bookRepository.getBookById(id)
            .then(book => {
                response.status(200).send(book);
            })
            .catch(error => BookController.errorResponse(response, error));
    }

    addBook(request, response) {
        const book = BookController.getBookFromRequest(request);
        if (!book) {
            response.status(400).send({ errors: ['Invalid book']});
        }
        this.bookRepository.addBook(book)
            .then(() => {
                response.status(200).send({success: true, message: 'Book added successfully'});
            })
            .catch(error => BookController.errorResponse(response, error));
    }

    static errorResponse(response, error) {
        response.status(500).send({ errors: [error.message]})
    }

    static getBookFromRequest(request) {
        const title = request.body.title;
        const author = request.body.author;
        const isbn = request.body.isbn;
        if (!title || !author) {
            return null;
        }
        return new Book(title, author, isbn);
    }
}

export default new BookController().router;
