const mysql = require('mysql');


// create mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'daw-cache'
});

// connect DB

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Mysql connected.');
    }
});

module.exports = db;