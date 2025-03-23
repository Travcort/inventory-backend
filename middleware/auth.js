import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function auth(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: 'Invalid token.' });
    }
}
