module.exports = function(prefix, express, app){

  var router = express.Router();              // get an instance of the express Router

  router.get('/incoming', function(req, res) {
      res.type('json'); 
      res.json({ message: 'Hello' });   
  });

  app.use(prefix, router);

  return router;
}
