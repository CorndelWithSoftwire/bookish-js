
const fsp = require("fs.promises");
const express = require('express');
const Mustache = require('mustache');

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
        this.renderPage(request, response, "ux/html/home.html", userInfo);
    }

    renderPage(request, response, page, data) {
        fsp.readFile(page, 'utf8').then(
            (pageTemplate) => {
                let pageHtml = Mustache.render(pageTemplate, data);
                response.status(200).send(pageHtml);
            }
        ).catch((e) => this.errorResponse(response, e));
    }

    errorResponse(response, error, statusCode){
        if ( ! statusCode ){
            statusCode = 500;
        }
        response.status(statusCode).send(error);
}

}

module.exports = new UxController().router;