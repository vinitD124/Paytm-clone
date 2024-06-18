const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;



    if (!authHeader) {
        
        return res.status(403).json({
            success: false,
            message: 'Token not found'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        
        const decode = jwt.verify(token, 'TOKEN');
        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Token is invalid'
        });
    }
};

module.exports = authMiddleware;
