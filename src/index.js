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
app.use('/books', passport.authenticate('jwt', {session: false}), BookController);

// handle errors, log diagnostic, give user simple error message
app.use(function (err, req, res, next) {
  console.error( err );
  res.status(500).send('System unable to process request, please try later.')
})

app.listen(3000, () => console.log('\nBookish listening on port 3000'));

function configurePassportToAuthenticateTokens() {
    // Ensure that there is a valid JSON Web Token
    const jwtOptions = {};
    jwtOptions.jwtFromRequest = passportJwt.ExtractJwt.fromHeader('x-access-token');
    jwtOptions.secretOrKey = secret;
    const userRepository = new UserRepository();
    passport.use(new passportJwt.Strategy(jwtOptions, (decodedJwt, next) => {
        userRepository.getUserByName(decodedJwt.username)
            .then(user => {
                next(null, user);
            });
    }));
}
