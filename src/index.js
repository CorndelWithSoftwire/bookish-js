import BookController from './controllers/bookController.js';
import LoginController from './controllers/loginController.js';
import UserRepository from "./repositories/userRepository.js";
import { secret } from './config.js';

import express from 'express';

import passport from 'passport';
import passportJwt from 'passport-jwt';

const app = express();


app.use(passport.initialize());
app.use(express.json());

app.use('/books',  BookController);

// handle errors, log diagnostic, give user simple error message
app.use(function (err, req, res, next) {
  console.error( err );
  res.status(500).send('System unable to process request, please try later. ' + err);
})

app.listen(3000, () => console.log('\nBookish listening on port 3000'));


