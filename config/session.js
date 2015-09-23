var session  = require('express-session');

module.exports = function(app){
  // required for passport
  app.use(
    session( 
      {
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET // session secret
      }
    )
  ); 
}