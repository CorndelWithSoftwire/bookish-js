import Repository from './repository';
import User from '../models/user';

export default class UserRepository extends Repository {
    getUser(username) {
        return this.db.one('SELECT * FROM users WHERE username = $1', username)
            .then(user => {
                    return new User(user.username, user.displayname, user.password);
                }
            );
    }

    getAuthenticatedUser(username, password) {
        return this.getUser(username)
            .then(user => {
                if (user.password === password) {
                    return user;
                } else {
                    throw new Error('Invalid Password');
                }
            });
    }
}