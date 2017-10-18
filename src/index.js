import BookRepository from './repositories/bookRepository';

import express from 'express';

const app = express();

app.get('/allbooks', (req, res) => {
    const bookRepo = new BookRepository();
    bookRepo.getAllBooks()
        .then(books => {
            res.send(books);
        });
});

app.listen(3000, () => console.log('\nBookish listening on port 3000'));