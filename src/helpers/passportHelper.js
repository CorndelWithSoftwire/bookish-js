import User from '../models/user';
import { secret } from "../config";

import passport from 'passport';
import passportJwt from 'passport-jwt';

export function configurePassportToAuthenticateTokens() {
    // Ensure that there is a valid JSON Web Token
    const jwtOptions = {};
    jwtOptions.jwtFromRequest = passportJwt.ExtractJwt.fromHeader('x-access-token');
    jwtOptions.secretOrKey = secret;
    passport.use(new passportJwt.Strategy(jwtOptions, (decodedJwt, next) => {
        User.findAll({ where: {username: decodedJwt.username}})
            .then(users => {
                if (users.length) {
                    next(null, users[0]);
                }
            });
    }));
}