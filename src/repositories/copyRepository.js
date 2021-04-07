import {executeSql, beginTransaction, executeSqlInTransaction} from '../helpers/dbHelper';
import Loan from '../models/loan';

export default class CopyRepository {

    getLoansForUser(username) {
        return executeSql('SELECT books.title, books.author, copies.id as copyid, copies.bookid, copies.duedate, copies.borrower FROM books, copies, users ' 
                        + ' WHERE  users.username= @username '
                        + ' AND copies.borrower = users.username '
                        + ' AND books.id = copies.bookid', 
                                                        { 'username' : username} )
            .then(result => {
                let loanResults = result.recordsets[0];
                if ( loanResults.length < 1) {
                    return null;
                }
                     
                let loans = [];
                loadResults.forEach(
                        loan => {
                            let oneLoan =  new Loan(loan.bookid, load.copyid, load.title, loan.author, load.isbn, loan.borrower, load.duedate);
                            loans.push(oneLoan);
                      } );
                return loans;
            });
    }


    borrowBook( bookid, copyid, borrower) {
            return executeSql('UPDATE C SET '
                        + ' C.duedate = CONVERT(DATE,DATEADD(DAY,14,GETDATE())), '
                        + ' C.borrower = @borrower' 
                        + ' OUTPUT INSERTED.*'
                        + ' FROM copies C'
                        + ' WHERE  C.bookid = @bookid '
                        + ' AND C.id = @copyid '
                        + ' AND C.borrower is null  ',
                            { 'bookid' : bookid, 'copyid' : copyid, 'borrower': borrower} )
            .then(result => {
                return result;
            }).catch( e => {
                console.log("e " + JSON.stringify(e) );
                throw e;
            });;


    }
}

