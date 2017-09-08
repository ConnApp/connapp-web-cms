module.exports = function( app ) {
  const auth = app.controllers.auth;

  app.get( '/auth/signin', auth.renderLogin );
  app.post( '/auth/signin', auth.signin );
  
};
