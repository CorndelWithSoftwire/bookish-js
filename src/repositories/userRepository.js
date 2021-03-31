
import Repository from './repository';
import User from '../models/user';

export default class UserRepository extends Repository {
    getUser(username, password) {
        return this.run('SELECT * FROM users WHERE username = @username AND password = @password', 
                                          { "username": username, "password": password} )
            .then(result => {
                let user = result.recordset[0];
                if ( (!! user) ) {
                    return new User(user.username, user.displayname, user.password);
                } else {
                    throw new Error('Invalid Username or Password');
                }
            });
    }
}
