
import BookController from './controllers/bookController';
import express from 'express';

const app = express();


app.use('/login', (req, res, next) => {
    res.status(500).send("Login not implemented yet");
} );

app.use('/', (req, res, next) => {
   if ( ! req.headers.token ) {
       res.status(401).send("computer says no");
   } else {
       next();
   }
} );

app.use('/books', BookController  );

// handle errors, log diagnostic, give user simple error message
app.use(function (err, req, res, next) {
  console.error( err );
  res.status(500).send('System unable to process request, please try later.')
})


app.listen(3000, () => console.log('\nBookish listening on port 3000'));

