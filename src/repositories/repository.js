import pgp from 'pg-promise';

export default class Repository {
    constructor() {
        this.db = pgp(/*options*/)('postgres://corndel:corndel@localhost:5432/bookish');
    }
}