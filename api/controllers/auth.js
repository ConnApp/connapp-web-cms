const
  path = require( 'path' ),
  passport = require( 'passport' );

module.exports = function() {
  const { ROOT_PATH } = require( '../config/env' );

  function renderLogin( req, res ) {
    res.sendFile( path.join( ROOT_PATH, 'app/src/views/login.html' ) );
  }

  function signin( req, res, next ) {
    passport.authenticate( 'local', ( error, user, info ) => {
      if ( error ) return next( error );
      if ( !user ) return res.status( 500 ).send( { ...info } );

      req.logIn( user, error => {
        if ( error ) return res.status( 500 ).send( { ...error } );
        res.status( 200 ).json( user );
      });
    })( req, res, next );
  }

  function signout( req, res ) {
    req.logout();
    res.redirect( '/auth/signin' );
  }

  return {
    renderLogin,
    signin,
    signout
  };
};
