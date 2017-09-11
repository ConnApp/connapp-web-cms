module.exports = function( app ) {
  const authController = app.controllers.auth;

  app.get( '/auth/signin', authController.renderLogin );
  app.post( '/auth/signin', authController.signin );
  app.get( '/auth/signout', authController.signout );
  
};
