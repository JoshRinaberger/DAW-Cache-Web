const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');

const { db, promiseQuery } = require('./db');

const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'); 
const validUsername = new RegExp('^[a-zA-Z0-9_.-]*$');
const validPassword = new RegExp('^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$');

router.post('/', async (req, res) => {
    let user = req.body.user;
    console.log(user);

    let registerError = await verifyUser(user);
    console.log(registerError);

    if (registerError === "") {
        registerError = await saveUser(user);
    }

    if (registerError != "") {
        res.send({ registerStatus: registerError });
    } else {
        res.send({ registerStatus: "register sucess" });
    }
});

async function verifyUser(user) {
    let registerError = verifyEmail(user.email);

    if (registerError != "") {
        return registerError;
    }

    registerError = veryifyUsername(user.username);

    if (registerError != "") {
        return registerError;
    }

    registerError = verifyPassword(user.password, user.passwordConfirm);

    if (registerError != "") {
        return registerError;
    }

    registerError = verifyBirthday(user.birthday);

    if (registerError != "") {
        return registerError;
    }

    if (await checkDuplicateEmail(user.email) === true) {
        console.log("EMAIL TAKEN");
        registerError = "Email already taken.";
    }

    if (registerError != "") {
        return registerError;
    }

    if (await checkDuplicateUsername(user.username) === true) {
        console.log("USERNAME TAKEN");
        registerError = "Username already taken.";
    }

    if (registerError != "") {
        return registerError;
    }

    return "";
}

function verifyEmail(email) {
    if (email === undefined) {
        return "Email is required.";
    }

    if (email === null) {
        return "Email is required.";
    }

    if (email.length > 254) {
        return "Email must be no greater than 254 characters.";
    }

    if (email.length <= 0) {
        return "Email is required.";
    }

    if (validEmail.test(email) === false) {
        return "Email format is not valid.";
    }

    return "";
}

function veryifyUsername(username) {
    if (username === undefined) {
        return "Username is required.";
    }

    if (username === null) {
        return "Username is required.";
    }

    if (username.length > 16) {
        return "Username must be no greater than 16 characters.";
    }

    if (username.length <= 0) {
        return "Username is required.";
    }

    if (validUsername.test(username) === false) {
        return "Username can only contain letters and numbers.";
    }

    return "";
}

function verifyPassword(password, passwordConfirm) {
    if (password === undefined) {
        return "Password is required.";
    }

    if (password === null) {
        return "Password is required.";
    }

    if (password.length > 16) {
        return "Password must be no greater than 16 characters.";
    }
    
    if (password.length < 8) {
        return "Password must be longer than 8 characters.";
    }

    if (validPassword.test(password) === true) {
        return "Password must include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    if (passwordConfirm === undefined) {
        return "Password and confirm password must match.";
    }

    if (passwordConfirm === null) {
        return "Password and confirm password must match.";
    }

    if (password != passwordConfirm) {
        return "Password and confirm password must match.";
    }

    return "";
}

function verifyBirthday(birthday) {
    if (birthday === undefined) {
        return "Birthday is required.";
    }

    if (birthday === null) {
        return "Birthday is required.";
    }

    var currentDate = new Date();
    var birthDate = new Date(birthday);

    var dateDifference = currentDate.getFullYear() - birthDate.getFullYear();
    var month = currentDate.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate())) {
        dateDifference--;
    }

    if (dateDifference < 13) {
        return "Must be at least 13 years old to register.";
    }

    return "";
}

async function saveUser (user) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userID = uuidv4();

    let query = 'INSERT INTO user (userId, username, email, password, birthday) values (?, ?, ?, ?, ?);';

    let dbError = "";

    db.query(query, [
        userID,
        user.username,
        user.email,
        hashedPassword,
        user.birthday], (err, rows) => {

            if (err) {
                console.log(err);
                dbError =  "Server error. Please try again.";
            }
    });

    return dbError;
}

async function checkDuplicateEmail (email) {
    let query = 'SELECT * FROM user WHERE email=?;';

    let duplicateFound = false;

    /*
    await db.execute(query, [email], async (err, rows) => {
        console.log(rows);
    });*/

    const foundUser = await promiseQuery(query, [email]);

    if (foundUser.length != 0) {
        duplicateFound = true;
    }

    return duplicateFound;
}

async function checkDuplicateUsername (username) {
    let query = 'SELECT * FROM user WHERE username=?;';

    let duplicateFound = false;

    /*
    await db.execute(query, [email], async (err, rows) => {
        console.log(rows);
    });*/

    const foundUser = await promiseQuery(query, [username]);

    if (foundUser.length != 0) {
        duplicateFound = true;
    }

    return duplicateFound;
}

module.exports = router;