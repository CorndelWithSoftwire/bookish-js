import Repository from './repository';
import User from '../models/user';

export default class UserRepository extends Repository {
    getUser(username, password) {
        return this.db.one('SELECT * FROM users WHERE username = $1', username)
            .then(user => {
                if (user.password === password) {
                    return new User(user.username, user.displayname, user.password);
                } else {
                    throw new Error('Invalid Password');
                }
            });
    }
}