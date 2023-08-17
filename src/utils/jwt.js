import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/constantConfig.js';

//if need jwt
const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
}

export { verifyToken }