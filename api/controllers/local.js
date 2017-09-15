const Promise = require( 'promise' );

module.exports = function( app ) {
  const
    Model = app.models.local,
    local = require( '../lib/mongoose' )( Model );

  function create( req, res ) {
    const doc = req.body;

    Promise.resolve( doc )
      .then( validateName )
      .then( save )
      .then( _local => res.status( 200 ).json( _local._doc ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateName( _doc ) {
      if ( !_doc.name ) {
        throw new ReferenceError( 'A propriedade name é obrigatória' );
      }
      return _doc;
    }

    function save( _doc ) {
      return local.save( _doc );
    }

  }

  function list( req, res ) {

    Promise.resolve()
      .then( query )
      .then( _locais => res.status( 200 ).json( _locais ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function query() {
      return local.query();
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
      return local.update( { _id }, _doc );
    }
  }

  function disable( req, res ) {
    const { _id } = req.body;

    Promise.resolve( _id )
      .then( validateId )
      .then( logicalRemove )
      .then( status => res.status( 200 ).json( status ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateId( _id ) {
      if ( typeof _id !== 'string' || _id.length < 24 ) {
        throw new Error( 'A propriedade _id é inválida' );
      }

      return _id;
    }

    function logicalRemove( _id ) {
      return local.logicalRemove( { _id } );
    }

  }

  function findOne( req, res ) {
    const { _id } = req.params;

    Promise.resolve( _id )
      .then( validateId )
      .then( find )
      .then( _local => res.status( 200 ).json( _local ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateId( _id ) {
      if ( typeof _id !== 'string' || _id.length < 24 ) {
        throw new Error( 'A propriedade _id é inválida' );
      }

      return _id;
    }

    function find( _id ) {
      return local.get( { _id } );
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