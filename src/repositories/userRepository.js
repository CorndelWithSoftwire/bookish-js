
const executeSql = require( '../helpers/dbHelper');
const User = require('../models/user');

class UserRepository {
    constructor() { this.type = "UserRepository" }

    // validate username/password
    getAuthenticatedUser(username, password) {
        return executeSql('SELECT users.username, users.displayname  FROM users WHERE username = @username AND password = @password', 
                                          { "username": username, "password": password} )
            .then(result => {
                let user = result.recordset[0];
                if ( (!! user) ) {
                    return new User(user.username, user.displayname);
                } else {
                    throw new Error('Invalid Username or Password');
                }
            });
    }

    // is this a valid username
    getUserByName(username) {
        return executeSql('SELECT users.username, users.displayname FROM users WHERE username = @username ' , 
                                          { "username": username } )
            .then(result => {
                let user = result.recordset[0];
                if ( (!! user) ) {
                    return new User(user.username, user.displayname);
                } else {
                    throw new Error('No such user ' + username);
                }
            });

    }
};

module.exports =  UserRepository ;
