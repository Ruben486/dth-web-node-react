const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.JWT_SECRET_KEY;

function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '24h' });
}

module.exports = {
    generateToken
};