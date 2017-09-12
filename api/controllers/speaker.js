const Promise = require( 'promise' );

module.exports = function( app ) {
  const
    Model = app.models.speaker,
    speaker = require( '../lib/mongoose' )( Model );

  function create( req, res ) {
    const doc = req.body;

    Promise.resolve( doc )
      .then( validateName )
      .then( save )
      .then( _speaker => res.status( 200 ).json( _speaker ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateName( _doc ) {
      if ( !_doc.name ) {
        throw new ReferenceError( 'A propriedade name é obrigatória' );
      }

      return _doc;
    }

    function save( _doc ) {
      return new Promise( ( resolve, reject ) => {
        speaker.save( _doc )
          .then( _speaker => resolve( _speaker._doc ) )
          .catch( reject );
      });
    }
  }

  function list( req, res ) {

    Promise.resolve()
      .then( query )
      .then( _speakers => res.status( 200 ).json( _speakers ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function query() {
      return new Promise( ( resolve, reject ) => {
        speaker.query()
          .then( _speakers => resolve( _speakers ) )
          .catch( reject );
      });
    }
  }
  
  return {
    create,
    list
  }
};