module.exports = function( app ) {
  const userController = app.controllers.user;

  app.post( '/user/new', userController.create );
  app.get( '/user/list', userController.list );
  app.get( '/user/remove/:email', userController.remove );
}
