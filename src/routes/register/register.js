const path = require('path');
const register_view = '../../views/GET/register.html';


module.exports = (req, res) => {
  res.sendFile(path.join(__dirname, register_view));
};