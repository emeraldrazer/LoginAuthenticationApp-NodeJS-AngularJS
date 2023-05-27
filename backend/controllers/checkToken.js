const jwt = require('jsonwebtoken');
const {key} = require('../key');

const checkToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: true, message: "No token provided" });
    }

    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: true, message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = checkToken;