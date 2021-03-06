// config/passport.js

var passport = require('passport');
var User     = require('../app/models/user');

// load all the things we need
//var LocalStrategy   = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function(app) {

    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    require('./passport-slack')(passport, app, User); // pass passport for configuration

};