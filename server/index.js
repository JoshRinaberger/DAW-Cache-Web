const express = require('express');
const app = express();

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

app.get('/user', (req, res) => {
    let query = 'SELECT * from user';
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.get("/api", (req, res) => {
    res.json({"message" : "test"});
});

app.listen(3001, () => {
    console.log("Server started on 3001");
})