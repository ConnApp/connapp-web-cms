module.exports = function( app ) {
  const userController = app.controllers.user;

  app.post( '/users', userController.create );
  app.put( '/users', userController.update );
  app.get( '/users', userController.list );
  app.get( '/users/:_id', userController.findOne );
  app.delete( '/users', userController.disable );
  
};
