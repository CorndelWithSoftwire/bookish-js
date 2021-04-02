import BookRepository from '../repositories/bookRepository';

import express from 'express';
import passport from 'passport';

const router = express.Router();
const bookRepo = new BookRepository();


router.get('/books', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    bookRepo.getAllBooks()
        .then(books => {
            res.send(books);
        }).catch(next);
});

export default router;
