module.exports = function(prefix, express, app, passport){

  var router = express.Router();              // get an instance of the express Router

  // router.get('/incoming', function(req, res) {
  //     res.type('json'); 
  //     res.json({ message: 'Hello' });   
  // });


  // =====================================
  // LOGOUT ==============================
  // =====================================
  router.get('/logout', function(req, res) {
      console.log('LOGOUT ROUTE', req.url)
      req.logout();
      res.redirect('/');
  });


  // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  var regex_exp = '^' + escapeRegExp(prefix) + '.*' ;
  var prefix_regex = new RegExp(regex_exp);


  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

    if(req.url.match(prefix_regex)){
      console.log('UNPROTECTED ROUTE', req.url);
      return next();
    }
    console.log('PROTECTED ROUTE', req.url);

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

  app.use(isLoggedIn);

  app.use(prefix, router);

  return router;
}
