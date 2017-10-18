import BookRepository from '../repositories/bookRepository';

import express from 'express';

const router = express.Router();
const bookRepo = new BookRepository();

router.get('/allbooks', (req, res) => {
    bookRepo.getAllBooks()
        .then(books => {
            res.status(200).send(books);
        });
});

export default router;
