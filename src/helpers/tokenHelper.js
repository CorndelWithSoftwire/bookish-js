
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


function getTokenInfo(token) {
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (e) {
        return false;
    }
}

module.exports = {
    "getTokenInfo": getTokenInfo,
    "createTokenForUser": createTokenForUser,
    "isTokenValid" : isTokenValid
}

