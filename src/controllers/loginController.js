import User from '../models/user';
import { createTokenForUser } from '../helpers/tokenHelper';

import express from 'express';

class LoginController {
    constructor() {
        this.router = express.Router();
        this.router.get('/', this.login.bind(this));
    }

    login(request, response) {
        const username = request.query.username;
        const password = request.query.password;
        if (!username || !password) {
            response.status(400).send({errors: ['Must contain a `username` and `password`']})
        } else {
            User.findAll({ where: {username: username}})
                .then(users => {
                    LoginController.ensureFirstUserHasCorrectPassword(users, password);
                    const user = users[0];
                    response.status(200).send({
                        message: `Welcome, ${user.displayname}!`,
                        token: createTokenForUser(user)
                    });
                })
                .catch(error => {
                    response.status(400).send({errors: [
                        'Unable to match username and password to a valid user',
                        error.message
                    ]})
                });
        }
    }

    static ensureFirstUserHasCorrectPassword(users, password) {
        if (!users.length) {
            throw new Error('No user found with this username');
        }
        const user = users[0];
        if (user.password !== password) {
            throw new Error('Invalid password');
        }
    }
}

export default new LoginController().router;
