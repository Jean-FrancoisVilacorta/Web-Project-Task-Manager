const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;
        
        const decoded = jwt.verify(tokenValue, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = auth;