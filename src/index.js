import BookController from './controllers/bookController';
import LoginController from './controllers/loginController';
import { configurePassportToAuthenticateTokens } from "./helpers/passportHelper";

import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';

const app = express();

configurePassportToAuthenticateTokens();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/login', LoginController);
app.use('/books', BookController);

app.listen(3000, () => console.log('\nBookish listening on port 3000'));

