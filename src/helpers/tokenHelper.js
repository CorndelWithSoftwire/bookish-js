import { secret } from "../config";

import jwt from 'jsonwebtoken';

export function createTokenForUser(user) {
    return jwt.sign({ username: user.username }, secret);
}