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
      .then( _speaker => res.status( 200 ).json( _speaker._doc ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateName( _doc ) {
      if ( !_doc.name ) {
        throw new ReferenceError( 'A propriedade name é obrigatória' );
      }

      return _doc;
    }

    function save( _doc ) {
      return speaker.save( _doc );
    }
  }

  function list( req, res ) {

    Promise.resolve()
      .then( query )
      .then( _speakers => res.status( 200 ).json( _speakers ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function query() {
      return speaker.query();
    }
  }

  function update( req, res ) {
    const doc = req.body;

    Promise.resolve( doc )
      .then( validateId )
      .then( updateDate )
      .then( setNewData )
      .then( status => res.status( 200 ).json( status ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) )

    function validateId( _doc ) {
      if ( !_doc._id ) {
        throw new Error( 'A propriedade _id é obrigatória' );
      }
      return _doc;
    }

    function updateDate( _doc ) {
      _doc.lastUpdate = Date.now();
      return _doc;
    }

    function setNewData( _doc ) {
      return speaker.update( { _id: _doc._id }, _doc );
    }
  }

  function disable( req, res ) {
    const speakerId = req.body._id;

    Promise.resolve( speakerId )
      .then( validateId )
      .then( logicalRemove )
      .then( status => res.status( 200 ).json( status ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateId( _speakerId ) {
      if ( typeof _speakerId !== 'string' || _speakerId.length < 24 ) {
        throw new Error( 'A propriedade _id é inválida' );
      }

      return _speakerId;
    }

    function logicalRemove( _speakerId ) {
      return speaker.logicalRemove( { _id: speakerId } );
    }

  }

  function findOne( req, res ) {
    const speakerId = req.params._id;

    Promise.resolve( speakerId )
      .then( validateId )
      .then( find )
      .then( _speaker => res.status( 200 ).json( _speaker ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateId( _speakerId ) {
      if ( typeof _speakerId !== 'string' || _speakerId.length < 24 ) {
        throw new Error( 'A propriedade _id é inválida' );
      }

      return _speakerId;
    }

    function find( _speakerId ) {
      return speaker.get( { _id: _speakerId } );
    }

  }
  
  return {
    create,
    list,
    findOne,
    update,
    disable
  };
};