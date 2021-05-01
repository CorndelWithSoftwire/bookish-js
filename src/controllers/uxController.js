

const express = require('express');
const renderPage = require('../helpers/pageHelper');
const BookRepository = require('../repositories/bookRepository');


class UxController {
    constructor() {
        this.router = express.Router();
        this.router.get('/home', (request, response) => this.getHome(request, response));
        this.router.get('/catalogue', (request, response) => this.getCatalogue(request, response));
        this.router.post('/', (request, response) => this.postWork(request, response));
        this.bookRepository = new BookRepository();
    }

    getHome(request, response) {
        var userInfo = {
            user: request.bookishUser.username,
            name: request.bookishUser.displayName
        };
        renderPage(request, response, "ux/html/home.html", userInfo);
    }

    getCatalogue(request, response) {
        var userInfo = {
            user: request.bookishUser.username,
            name: request.bookishUser.displayName
        };
        this.bookRepository.getAllBooks()
            .then(books => {
                const catalogueData = {
                    userInfo: userInfo,
                    books: books
                };
                renderPage(request, response, "ux/html/catalogue.html", catalogueData);
            }
            );
    }


    errorResponse(response, error, statusCode) {
        if (!statusCode) {
            statusCode = 500;
        }
        response.status(statusCode).send(error);
    }

}

module.exports = new UxController().router;