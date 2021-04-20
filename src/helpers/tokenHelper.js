
const config  = require( "../config");
const secret = config.secret;

const jwt = require('jsonwebtoken');

function createTokenForUser(user) {
    return jwt.sign({ username: user.username }, secret);
}

function isTokenValid(token) {
    if (!token) {
        return false;
    }
    try {
        const decoded = jwt.verify(token, secret);
        return !!decoded;
    } catch (e) {
        return false;
    }
}

module.exports = {
    "createTokenForUser": createTokenForUser,
    "isTokenValid" : isTokenValid
}

