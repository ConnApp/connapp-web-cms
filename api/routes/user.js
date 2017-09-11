module.exports = function( app ) {
  const userController = app.controllers.user;

  app.post( '/user', userController.create );
  app.put( '/user', userController.update );
  app.get( '/user', userController.list );
  app.delete( '/user', userController.disable );
  
};
