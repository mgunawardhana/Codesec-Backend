const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // const jwt_sec  = process.env.JWT_SECRET;

    try {
        req.user = jwt.verify(token, "7b9f2a8d5e4c1f6b3a9d8e7c2f5b4a1d9e8c7f3a2b6d5e4c1f9b8a7d3e2c6f5");
        next();
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;