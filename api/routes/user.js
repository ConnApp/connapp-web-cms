module.exports = function( app ) {
  const 
    { checkAuthorization } = require( '../middlewares/authorize' ),
    userController = app.controllers.user;

  app.post( '/users', checkAuthorization, userController.create );
  app.put( '/users', checkAuthorization, userController.update );
  app.get( '/users', checkAuthorization, userController.list );
  app.get( '/users/:_id', checkAuthorization, userController.findOne );
  app.delete( '/users', checkAuthorization, userController.disable );
  
};
