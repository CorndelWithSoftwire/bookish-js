import CopyRepository from '../repositories/copyRepository';

import express from 'express';

class LoanController {
    constructor() {
        this.copyRepository = new CopyRepository();
        this.router = express.Router();
        this.router.get('/:username', (request, response, next) => this.getLoansForUser(request, response, next) );
        this.router.post('/', (request, response) => this.borrowBook(request, response) );
    }

    getLoansForUser(request, response, next) {
        const username = request.params.username;
        this.copyRepository.getLoansForUser(username)
            .then(loans => {
                if ( loans ) {
                    response.status(200).send(loans);
                } else {
                    // TODO: differentiate no such user, and no loans for user
                    var err = 'Not found, username = ' + username;
                    response.status(404).send(err);
                }
            })
            .catch(error => LoanController.errorResponse(response, error));
    }

    borrowBook(request, response) {

        let bookid = request.body.bookid;
        let copyid = request.body.copyid;
        let borrower = request.body.borrower;

        if ( ! bookid ) {
            LoanController.errorResponse(response, { "message":"Must specify bookid, copyid and borrower"}, 400);
            return;
        }

        if ( ! copyid ) {
            LoanController.errorResponse(response, { "message":"Must specify bookid, copyid and borrower"}, 400);
            return;
        }

        if ( ! borrower ) {
            LoanController.errorResponse(response, { "message":"Must specify bookid, copyid and borrower"}, 400);
            return;
        }

        this.copyRepository.borrowBook(bookid, copyid, borrower)
            .then((result) => {
                if ( result.rowsAffected[0] < 1 ){
                     LoanController.errorResponse(response, { "message": "Loan copy not found "}, 404) ;
                     return
                }
                const row = result.recordset[0]
                const  reference = request.protocol + '://' + request.get('host') + request.originalUrl 
                                                    + "/" + row.bookid 
                                                    + "/" + row.id ;
                const responseBody = {
                    "message" : "Book borrowed",
                    "bookId" : row.bookid,
                    "copyId" : row.id,
                    "borrower" : row.borrower,
                    "duedate" : row.duedate,
                    "reference" : reference
                };
                
                response.status(201)
                      .set('Location', reference)
                      .send( JSON.stringify( responseBody) );
            })
            .catch(error => { 
                  console.log("failed to borrow " + error);
                  LoanController.errorResponse(response, { "message": "System error, please try again later"}, 500) ;
             } );
    }

    static errorResponse(response, error, status) {
        status = (!!status)? status: 500;
        response.status(status).send({ errors: [error.message]})
    }


}

export default new LoanController().router;
