// config/passport.js

// load all the things we need
var SlackStrategy   = require('passport-slack').Strategy;

// expose this function to our app using module.exports
module.exports = function(passport, app, User) {
    passport.use(new SlackStrategy({
        clientID: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        callbackURL: (process.env.URL_ROOT || "http://localhost:8080") + "/auth/slack/callback"
      },
      function(token, refreshToken, profile, done) {
            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function() {

                // try to find the user based on their google id
                User.findOne({ 'slack.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser          = new User();

                        // set all of the relevant information
                        newUser.slack.id    = profile.id;
                        newUser.slack.name  = profile.displayName;

                        // We may want to treat each team as a separate identity?
                        // What if the user wants multiple integrations with different teams?
                        newUser.slack.token = token;
                        newUser.slack.team_url = profile._json.url;
                        newUser.slack.team_name = profile._json.team;
                        newUser.slack.team_id = profile._json.team_id;

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
       }
     ));

    // =====================================
    // SLACK ROUTES =======================
    // =====================================
    // send to slack to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/slack', passport.authenticate('slack', { scope : ['identify','read', 'post', 'client'] }));

    // the callback after google has authenticated the user
    app.get('/auth/slack/callback',
            passport.authenticate('slack', {
                    successRedirect : '/',
                    failureRedirect : '/'
            }));


};