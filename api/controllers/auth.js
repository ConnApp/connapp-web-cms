const
  path = require( 'path' ),
  passport = require( 'passport' );

module.exports = function() {
  const ROOT_PATH = process.env.PWD;

  function renderLogin( req, res ) {
    res.sendFile( path.join( ROOT_PATH, 'app/src/views/login.html' ) );
  }

  function signin() {
    return passport.authenticate( 'local', {
      successRedirect: '/',
      failureRedirect: '/auth/signin'
    });
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
