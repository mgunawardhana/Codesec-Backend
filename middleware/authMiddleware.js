const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // eslint-disable-next-line no-undef
    const jwt_sec  = process.env.JWT_SECRET;

    try {
        req.user = jwt.verify(token, jwt_sec);
        next();
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;