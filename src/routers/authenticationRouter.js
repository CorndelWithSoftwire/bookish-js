import UserRepository from '../repositories/userRepository';
import { createTokenForUser } from '../helpers/tokenHelper';
import { secret } from "../config";

import express from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';

const router = express.Router();
const userRepo = new UserRepository();

router.get('/login', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (!username || !password) {
        res.status(400).send({errors: ['Query params must contain both `username` and `password`']})
    } else {
        userRepo.getUser(username, password)
            .then(user => {
                res.status(200).send({
                    message: `Welcome, ${user.displayName}!`,
                    token: createTokenForUser(user)
                });
            })
            .catch(error => {
                res.status(400).send({errors: [
                    'Unable to match username and password to a valid user',
                    error.message
                ]})
            });
    }
});

passport.use(createJwtStrategy());
router.use(passport.initialize());

function createJwtStrategy() {
    // Ensure that there is a valid JSON Web Token
    const jwtOptions = {};
    jwtOptions.jwtFromRequest = passportJwt.ExtractJwt.fromHeader('x-access-token');
    jwtOptions.secretOrKey = secret;
    return new passportJwt.Strategy(jwtOptions, (decodedJwt, next) => {
        // does this token represent a valid user?
        userRepo.getUserByName(decodedJwt.username)
            .then(user => {
                next(null, user);
            }).catch(
                e => next(null, null, e)
            );;
    })
}


export default router;
