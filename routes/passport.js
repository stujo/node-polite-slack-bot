module.exports = function(prefix, app, router){
 // =====================================
  // LOGOUT ==============================
  // =====================================
  router.get('/logout', function(req, res) {
      console.log('LOGOUT ROUTE', req.url)
      req.logout();
      res.redirect('/');
  });

  app.use(prefix, router);
}
