module.exports = function( app ) {
  const userController = app.controllers.user;

  app.post( '/user/new', userController.create );
  app.post( '/user/update', userController.update );
  app.get( '/user/list', userController.list );
  app.get( '/user/disable/:email', userController.disable );
  app.get( '/user/remove/:email', userController.remove );
  
};
