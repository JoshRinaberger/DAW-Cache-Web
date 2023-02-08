const express = require('express');
const router = express.Router();

const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'); 
const validUsername = new RegExp('^[a-zA-Z0-9_.-]*$');
const validPassword = new RegExp('^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$');

router.post('/', (req, res) => {
    let user = req.body.user;
    console.log(user);

    let registerError = verifyUser(user);
    console.log(registerError);

    if (registerError != "") {
        res.send({ registerStatus: registerError });
    } else {
        res.send({ registerStatus: "register sucess" });
    }
});

function verifyUser(user) {
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

    return "";
}

function verifyEmail(email) {
    if (email === undefined) {
        return "Email is required.";
    }

    if (email === null) {
        return "Email is required.";
    }

    if (email.length > 16) {
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
    console.log(birthDate);
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

module.exports = router;