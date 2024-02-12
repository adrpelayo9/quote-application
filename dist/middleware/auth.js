import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
const auth = (req, res, next) => {
    if (req.headers['user-agent'] && req.headers['user-agent'].startsWith('ELB-HealthChecker')) {
        return next();
    }
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log('You are unauthenticated. Please login again. ');
        res.status(401).json({
            error: 'You are unauthenticated. Please login again. ',
        });
    }
};
export const isAdmin = (req, res, next) => {
    if (!req.user.roles.includes('ADMIN')) {
        return res
            .status(403)
            .json({ error: 'You are not allowed to do this action.' });
    }
    next();
};
export default auth;
