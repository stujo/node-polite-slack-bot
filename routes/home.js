var auth_helper = require('../app/helpers/auth');

module.exports = function(app){

  app.get('/', function(req, res) {
      res.end('HOME ' + auth_helper.username(req));
  });

};
