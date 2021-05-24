const UserRepository = require('../repositories/userRepository');
const  createTokenForUser  = require('../helpers/tokenHelper');

const express = require('express') ;

class LoginController {
    constructor() {
        this.userRepository = new UserRepository();
        this.router = express.Router();
        this.router.get('/', this.login.bind(this));
    }

    login(request, response) {
        const username = request.query.username;
        const password = request.query.password;
        if (!username || !password) {
            response.status(400).send({errors: ['Query params must contain both `username` and `password`']})
        } else {
            this.userRepository.getAuthenticatedUser(username, password)
                .then(user => {
                    response.status(200).send({
                        message: `Welcome, ${user.displayName}!`,
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
}

module.exports = new LoginController().router;