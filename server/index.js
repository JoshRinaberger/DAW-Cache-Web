const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const db = require('./db');

app.use('/register', require('./register'));
app.use('/login', require('./login'));

app.get('/user', async (req, res) => {

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