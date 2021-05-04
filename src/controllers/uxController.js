

const express = require('express');
const renderPage = require('../helpers/pageHelper');
const BookRepository = require('../repositories/bookRepository');


class UxController {
    constructor() {
        this.router = express.Router();
        this.router.get('/home', (request, response) => this.getHome(request, response));
        this.router.get('/catalogue', (request, response) => this.getCatalogue(request, response));
        this.bookRepository = new BookRepository();
    }

    getHome(request, response) {
        var userInfo = {
            user: "unknown",
            name: "Mock User"
        };
        renderPage(request, response, "ux/html/home.html", userInfo);
    }

    getCatalogue(request, response) {
      
        const userInfo = {
                user: "unknown",
                name: "Mock User"
            }

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

    renderPage(request, response, page, data) {
        fsp.readFile(page, 'utf8').then(
            (pageTemplate) => {
                let pageHtml = Mustache.render(pageTemplate, data);
                response.status(200).send(pageHtml);
            }
        )
    }


    errorResponse(response, error, statusCode) {
        if (!statusCode) {
            statusCode = 500;
        }
        response.status(statusCode).send(error);
    }

}

module.exports = new UxController().router;