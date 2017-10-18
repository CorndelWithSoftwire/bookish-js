import BookController from './controllers/bookController';
import LoginController from './controllers/loginController';
import UserRepository from "./repositories/userRepository";
import { secret } from './config';

import express from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';

const app = express();

configurePassportToAuthenticateTokens();

app.use(passport.initialize());
app.use('/login', LoginController);
app.use('/books', BookController);

app.listen(3000, () => console.log('\nBookish listening on port 3000'));

function configurePassportToAuthenticateTokens() {
    // Ensure that there is a valid JSON Web Token
    const jwtOptions = {};
    jwtOptions.jwtFromRequest = passportJwt.ExtractJwt.fromHeader('x-access-token');
    jwtOptions.secretOrKey = secret;
    const userRepository = new UserRepository();
    passport.use(new passportJwt.Strategy(jwtOptions, (decodedJwt, next) => {
        userRepository.getUser(decodedJwt.username)
            .then(user => {
                next(null, user);
            });
    }));
}