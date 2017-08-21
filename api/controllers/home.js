module.exports = function( app ) {
  function renderLogin( req, res ) {
    res.sendFile( 'views/login' );
  }

  return {
    renderLogin
  }
}
