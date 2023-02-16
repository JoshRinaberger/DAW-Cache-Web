const express = require('express');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const passport = require('passport');
const initializePassport = require('./authLocalStrat');
initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

const { db } = require('./db');

app.use('/register', require('./register'));
app.use('/login', require('./login')(passport));

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