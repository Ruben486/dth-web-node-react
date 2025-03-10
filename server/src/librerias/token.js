import jwt from 'jsonwebtoken';
import "dotenv/config";

const secretKey = process.env.JWT_SECRET_KEY;

const generateToken= (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1d' });
}
const verifyToken = (token) => {
    try {
        return jwt.verify(token,secretKey);
    } catch (error) {
        return null
    }
}
export {
    generateToken,
    verifyToken
};