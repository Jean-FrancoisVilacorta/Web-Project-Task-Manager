const path = require('path');
const login = (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
};

module.exports = login;