module.exports = function(prefix, app, router){

  router.get('/incoming', function(req, res) {
      res.type('json'); 
      res.json({ message: 'Hello' });   
  });

  app.use(prefix, router);
}
