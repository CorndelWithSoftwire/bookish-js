
import BookRepository from './repositories/bookRepository';

import express from 'express';

const app = express();
const bookRepo = new BookRepository();

app.get('/books', (req, res, next) => {
    bookRepo.getAllBooks()
        .then(books => {
            res.send(books);
        }).catch(next);
});

// handle errors, log diagnostic, give user simple error message
app.use(function (err, req, res, next) {
  console.error( JSON.stringify(err) )
  res.status(500).send('System unable to process request, please try later.')
})

app.listen(3000, () => console.log('\nBookish listening on port 3000'));

