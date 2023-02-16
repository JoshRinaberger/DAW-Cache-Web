const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { db, promiseQuery } = require('./db');


function initialize(passport) {
    const authenticateUser = async (accountName, password, done) => {
        let getUserQuery = 'SELECT * FROM user WHERE username=?;';
        
        if (accountName.includes('@') && accountName.includes('.')) {
            getUserQuery = 'SELECT * FROM user WHERE email=?;';
        }

        const user = await promiseQuery(getUserQuery, [accountName]);

        console.log(accountName);
        console.log("passport user");
        console.log(user);

        if (user === null || user.length === 0) {
            return done(null, false, { loginError: 'Username or password do not match.' });
        } 

        if (await bcrypt.compare(password, user[0].password)) {
            return done(null, user);
        } else {
            return done(null, false, { loginError: 'Username or password do not match.'})
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'accountName' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user[0].userID));
    passport.deserializeUser(async (userID, done) => {
        let getUserQuery = 'SELECT * FROM user WHERE userID=?;';
        const user = await promiseQuery(getUserQuery, [userID]);

        return done(null, user);
    });
}

module.exports = initialize;