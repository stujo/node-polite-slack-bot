module.exports = (function(){
   function user(req){
      return req.user || {
        slack: {}
      };
   }

   function username(req){
      return user(req).slack.name;
   }

   return {
      user: user,
      username: username
   };
})();