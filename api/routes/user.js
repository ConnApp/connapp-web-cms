module.exports = function( app ) {
  const userController = app.controllers.user;

  app.post( '/user/new', userController.createUser );
}
