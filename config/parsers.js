var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function(app){

  app.use(cookieParser()); // read cookies (needed for auth)

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

}
