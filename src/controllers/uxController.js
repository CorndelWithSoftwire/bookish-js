

const express = require('express');
const renderPage = require('../helpers/pageHelper');

class UxController {
    constructor() {
        this.router = express.Router();
        this.router.get('/home', (request, response) => this.getHome(request, response));
        this.router.post('/', (request, response) => this.postWork(request, response));
    }

    getHome(request, response) {
        var userInfo = {
            user: request.bookishUser.username,
            name: request.bookishUser.displayName
        };
        renderPage(request, response, "ux/html/home.html", userInfo);
    }


    errorResponse(response, error, statusCode){
        if ( ! statusCode ){
            statusCode = 500;
        }
        response.status(statusCode).send(error);
}

}

module.exports = new UxController().router;