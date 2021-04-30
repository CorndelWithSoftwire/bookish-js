
const UserRepository = require( '../repositories/userRepository');
const  TokenHelper  = require('../helpers/tokenHelper');
const renderPage = require('../helpers/pageHelper');
const express = require('express');

class AuthController {
    constructor() {
        this.userRepository = new UserRepository();
        this.router = express.Router();
        this.router.get('/login', (request, response) => renderPage(request, response, "ux/html/login.html") );
        this.router.post('/login', (request, response) => this.login(request, response) );
        this.router.use((request, response, next) => this.authCheck(request, response, next) );
    }


    login(request, response) {
        const username = request.body.username;
        const password = request.body.password;
        if (!username || !password) {
            response.status(400).send({errors: ['Specify both `username` and `password`']})
        } else {
            this.userRepository.getAuthenticatedUser(username, password)
                .then(user => {
                    let token = TokenHelper.createTokenForUser(user);
                    response.cookie('bookishjwt', token, { expires: new Date(Date.now() + 900000), httpOnly: true })
                    response.redirect('/ux/home');
                })
                .catch(error => {
                    response.status(400).send({errors: [
                        'Unable to match username and password to a valid user',
                        error.message
                    ]})
                });
        }
    }

    authCheck(request, response, next) {
        let token = request.headers['x-access-token'];
        if ( ! token ){
            token = request.cookies.bookishjwt;
        }
   
        let tokenInfo = TokenHelper.getTokenInfo(token);
        if ( !! tokenInfo) {
            this.userRepository.getUserByName(tokenInfo.username).then(
                 (userInfo) => {
                      request.bookishUser = userInfo;
                      next();
            }).catch( (e) => {
                return response.status(401).send({
                    success: false,
                    message: 'no token'
                    } );
           });
        } else {
            response.redirect('/login');
            return;
        }
    }

}

module.exports = new AuthController().router;

