const mysql = require('mysql');

// create mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
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

// query should be string, queryParams should be array of strings
function promiseQuery (query, queryParams) {
    return new Promise ((resolve, reject) => {
        db.query(query, queryParams, (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                resolve(rows);
            }
        });
    })
}

exports.db = db;
exports.promiseQuery = promiseQuery;