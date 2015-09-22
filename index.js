require('dotenv').load();

var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Authentication
var mongoose = require('mongoose');
var passport = require('passport');
var session      = require('express-session');

mongoose.connect(process.env.MONGODB_URL);

// required for passport
app.use(session({ secret: process.env.SESSION_SECRET })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(cookieParser()); // read cookies (needed for auth)

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable('x-powered-by');

var port = process.env.PORT || 8080;        // set our port

app.get('/', function(req, res) {
    res.end('HOME');
});

app.use('/auth', require('./routes/passport')(express,app,passport));

app.use('/slack', require('./routes/slack-incoming')(express));

app.listen(port);
console.log('Magic happens on port ' + port);

