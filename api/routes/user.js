module.exports = function( app ) {
  const 
    { isAuthorized } = require( '../middlewares/authorize' ),
    userController = app.controllers.user;

  app.post( '/users', isAuthorized, userController.create );
  app.put( '/users', isAuthorized, userController.update );
  app.get( '/users', isAuthorized, userController.list );
  app.get( '/users/:_id', isAuthorized, userController.findOne );
  app.delete( '/users', isAuthorized, userController.disable );
  
};
