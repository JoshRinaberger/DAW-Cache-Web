const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    loginCredentials = req.body.loginCredentials;

    if (loginCredentials.accountName.includes('@') && loginCredentials.accountName.includes('.')) {
        console.log("Email");
    } else {
        console.log("Username");
    }
});

module.exports = router;