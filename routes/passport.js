module.exports = function(express, app, passport){

  var router = express.Router();              // get an instance of the express Router

  // router.get('/incoming', function(req, res) {
  //     res.type('json'); 
  //     res.json({ message: 'Hello' });   
  // });


  // =====================================
  // LOGOUT ==============================
  // =====================================
  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

      // if user is authenticated in the session, carry on 
      if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
  }

  return router;
}
