const jwt = require('jsonwebtoken');
const token_const = require("../config/const_token");

const auth = (req, res, next) => {
    const token = token_const.token;

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