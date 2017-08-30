module.exports = function( app ) {
  const
    Model = app.models.user,
    user = require( '../lib/mongoose')( Model );

  function createUser( req, res ) {
    let doc = req.body;

    user.save( doc )
      .then( status => res.json( status ) )
      .catch( error => res.status( 500 ).json( error ) );
  }

  return {
    createUser
  };
};
