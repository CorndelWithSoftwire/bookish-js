import BookRepository from '../repositories/bookRepository';

import express from 'express';
import passport from 'passport';

const router = express.Router();
const bookRepo = new BookRepository();

router.get('/allbooks', passport.authenticate('jwt', {session: false}),  (req, res) => {
    bookRepo.getAllBooks()
        .then(books => {
            res.status(200).send(books);
        });
});

export default router;
