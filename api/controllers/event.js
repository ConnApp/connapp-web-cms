const Promise = require( 'promise' );

module.exports = function( app ) {
  const
    Model = app.models.event,
    event = require( '../lib/mongoose' )( Model );

  function create( req, res ) {
    const doc = req.body;

    Promise.resolve( doc )
      .then( validateName )
      .then( validateStartDate )
      .then( validateEndDate )
      .then( validateLocal )
      .then( save )
      .then( _event => res.status( 200 ).json( _event._doc ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateName( _doc ) {
      if ( !_doc.name ) {
        throw new ReferenceError( 'A propriedade name é obrigatória' );
      }
      return _doc;
    }

    function validateStartDate( _doc ) {
      if ( !_doc.start ) {
        throw new ReferenceError( 'A propriedade start é obrigatoria' );
      }
      return _doc;
    }

    function validateEndDate( _doc ) {
      if ( !_doc.end ) {
        throw new ReferenceError( 'A propriedade end é obrigatoria' );
      }
      return _doc;
    }

    function validateLocal( _doc ) {
      if ( !_doc.local || _doc.local.length < 24 ) {
        throw new ReferenceError( 'A propriedade local é obrigatoria' );
      }
      return _doc;
    }

    function save( _doc ) {
      return event.save( _doc );
    }

  }

  function list( req, res ) {

    Promise.resolve()
      .then( query )
      .then( _events => res.status( 200 ).json( _events ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function query() {
      return event.query();
    }
  }

  function update( req, res ) {
    const doc = req.body;

    Promise.resolve( doc )
      .then( validateId )
      .then( updateDate )
      .then( setNewData )
      .then( status => res.status( 200 ).json( status ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateId( { _id, ..._doc } ) {
      if ( !_id ) {
        throw new Error( 'A propriedade _id é obrigatória' );
      }
      return { _id, ..._doc };
    }

    function updateDate( _doc ) {
      _doc.lastUpdate = Date.now();
      return _doc;
    }

    function setNewData( { _id, ..._doc } ) {
      return event.update( { _id }, _doc );
    }
  }

  function disable( req, res ) {
    const eventId = req.body._id;

    Promise.resolve( eventId )
      .then( validateId )
      .then( logicalRemove )
      .then( status => res.status( 200 ).json( status ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateId( _eventId ) {
      if ( typeof _eventId !== 'string' || _eventId.length < 24 ) {
        throw new Error( 'A propriedade _id é inválida' );
      }

      return _eventId;
    }

    function logicalRemove( _eventId ) {
      return event.logicalRemove( { _id: _eventId } );
    }

  }

  function findOne( req, res ) {
    const eventId = req.params._id;

    Promise.resolve( eventId )
      .then( validateId )
      .then( find )
      .then( _event => res.status( 200 ).json( _event ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateId( _eventId ) {
      if ( typeof _eventId !== 'string' || _eventId.length < 24 ) {
        throw new Error( 'A propriedade _id é inválida' );
      }

      return _eventId;
    }

    function find( _eventId ) {
      return event.get( { _id: _eventId } );
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