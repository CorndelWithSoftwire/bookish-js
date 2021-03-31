import BookRepository from '../repositories/bookRepository';

import express from 'express';

const router = express.Router();
const bookRepo = new BookRepository();


router.get('/books', (req, res, next) => {
    bookRepo.getAllBooks()
        .then(books => {
            res.send(books);
        }).catch(next);
});

export default router;
