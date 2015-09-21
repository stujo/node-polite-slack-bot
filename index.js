require('dotenv').load();

var express    = require('express');        // call express
var app        = express();                 // define our app using express

var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable('x-powered-by');

var port = process.env.PORT || 8080;        // set our port

app.use('/slack', require('./routes/slack-incoming')(express));

app.listen(port);
console.log('Magic happens on port ' + port);

