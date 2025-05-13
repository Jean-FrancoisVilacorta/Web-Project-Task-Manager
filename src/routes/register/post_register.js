const path = require('path');
// const app = express();

// app.use(express.urlencoded({ extended: true }));

module. exports = (req, res) => {
    const { first_name, last_name, email } = req.body;

    console.log('DATA::');
    console.log('name:', first_name);
    console.log('last name:', last_name);
    console.log('mail:', email);

    res.send(`<h2>✅ Registre fait pour ${first_name} ${last_name}</h2>`);
}