const express = require('express');

module.exports = function(passport) {
    const router = express.Router();

    router.post('/', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    router.get('/isAuthenticated', (req, res) => {
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            res.send({ isAuthenticated: 'true' });
        } else {
            res.send({ isAuthenticated: 'false' })
        }
    })

    router.post('/logout', (req, res) => {
        req.logOut((err) => {
            if (err) {
                console.log(err);
            }
        });
    });

    return router;
}
