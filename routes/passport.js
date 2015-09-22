module.exports = function(express, app, passport){

  var router = express.Router();              // get an instance of the express Router

  router.get('/incoming', function(req, res) {
      res.type('json'); 
      res.json({ message: 'Hello' });   
  });

  return router;
}
