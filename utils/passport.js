const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/querys.js");



passport.use(
    new LocalStrategy(async function(username, password, done) {
        const errorMessage = "Incorrect username or password";

        try {
            const user = await db.findUniqueUser({
                where: {
                    username: username
                }
            });
            if (!user) {
                return done(null, false, {message: errorMessage});
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, {message: errorMessage});
            }

            return done(null, user);

        } catch (error) {
            done(error);
        }
    })
);


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(async function(id, done) {
    try {
        const user = await db.findUniqueUser({
            where: {
                id: id
            }
        });
        done(null, user);
    } catch (error) {
        done(error);
    }
});



module.exports = passport;