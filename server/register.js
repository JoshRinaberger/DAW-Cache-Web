const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log("REGISTER");

    let user = req.body;
    console.log(user);
});

module.exports = router;