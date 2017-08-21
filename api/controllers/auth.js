const
  path = require( 'path' ),
  debug = require( 'debug' )( 'authController' );

module.exports = function() {
  const
    ROOT_PATH = process.env.PWD;

  function renderLogin( req, res ) {
    res.sendFile( path.join( ROOT_PATH, 'app/src/views/login.html' ) );
  }

  return {
    renderLogin
  }
}
