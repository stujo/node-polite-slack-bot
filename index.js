require('dotenv').load();

var port = process.env.PORT || 8080;        // set our port
var express    = require('express');        // call express
var app        = express();                 // define our app using express

require('./config/mongoose')();
require('./config/session')(app);
require('./config/passport')(app);
require('./config/parsers')(app);
require('./config/settings')(app);

require('./routes/home')(app);
require('./routes/passport')('/auth', app, express.Router());
require('./routes/slack-incoming')('/slack', app, express.Router());

app.listen(port);

console.log('Listening on port ' + port);

