
function isAuthenticated( req, res, next ) {
  if ( req.isAuthenticated() || req.originalUrl === '/auth/signin' ) {
    return next();
  }
  res.redirect( '/auth/signin' );
}

function isAuthorized( req, res, next ) {
  const 
    { _id = req.body._id } = req.params,
    isUser = _id === req.user._id.toString(),
    isAdmin = req.user.group === 'admin';

  if ( isUser || isAdmin ) return next();
  return res.status( 401 ).send( { message: 'Usuário não autorizado' } );
}

module.exports = {
  isAuthenticated,
  isAuthorized
};
