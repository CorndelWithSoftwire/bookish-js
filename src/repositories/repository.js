import { dbConnectionString } from "../config";

import pgp from 'pg-promise';

const db = pgp(/*options*/)(dbConnectionString);

export default class Repository {
    constructor() {
        this.db = db;
    }
}