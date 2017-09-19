
function isAuthenticated( req, res, next ) {
  if ( req.isAuthenticated() || req.originalUrl === '/auth/signin' ) {
    return next();
  }
  res.redirect( '/auth/signin' );
}

function isAuthorized( req, res, next ) {
  if ( req.isAuthenticated() && req.user.group === 'admin' ) {
    return next();
  }
  res.status( 401 ).send( { message: 'Usuário não autorizado' } );
}

module.exports = {
  isAuthenticated,
  isAuthorized
};
