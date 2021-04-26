const BookController = require('./controllers/bookController');
const LoginController = require('./controllers/loginController');
const UserRepository = require('./repositories/userRepository');
const config = require('./config');
const secret = config.secret;

const express = require('express');
const bodyParser = require("body-parser");
const passport = require('passport');
const passportJwt = require('passport-jwt');

const app = express();

configurePassportToAuthenticateTokens();

app.use(express.static('ux'));

app.use(passport.initialize());
app.use(bodyParser.json());

app.use('/login', LoginController);
app.use('/books', BookController);
//app.use('/books', passport.authenticate('jwt', { session: false }), BookController);

// handle errors, log diagnostic, give user simple error message
app.use(function(err, req, res, next) {
    console.error(err);
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
            }).catch(e => next(null, null, e));
    }));
}
