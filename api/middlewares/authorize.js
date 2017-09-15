
function checkSession( req, res, next ) {
  if ( req.isAuthenticated() ) {
    return next();
  }
  res.redirect( '/auth/signin' );
}

function checkAuthorization( req, res, next ) {
  if ( req.isAuthenticated() && req.user.group === 'admin' ) {
    return next();
  }
  res.status( 401 ).send( { message: 'Usuário não autorizado' } );
}

module.exports = {
  checkSession,
  checkAuthorization
};
