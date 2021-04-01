
import {executeSql} from '../helpers/dbHelper';
import User from '../models/user';

export default class UserRepository {
    getUser(username, password) {
        return executeSql('SELECT * FROM users WHERE username = @username AND password = @password', 
                                          { "username": username, "password": password} )
            .then(result => {
                console.log("result " + JSON.stringify(result) );
                let user = result.recordset[0];
                if ( (!! user) ) {
                    return new User(user.username, user.displayname, user.password);
                } else {
                    throw new Error('Invalid Username or Password');
                }
            });
    }
}
