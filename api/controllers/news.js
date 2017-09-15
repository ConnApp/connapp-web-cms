const Promise = require( 'promise' );

module.exports = function( app ) {
  const
    Model = app.models.news,
    news = require( '../lib/mongoose' )( Model );

  function create( req, res ) {
    const doc = req.body;

    Promise.resolve( doc )
      .then( validateTitle )
      .then( validateMessage )
      .then( save )
      .then( _news => res.status( 200 ).json( _news._doc ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateTitle( _doc ) {
      if ( !_doc.title ) {
        throw new ReferenceError( 'A propriedade title é obrigatória' );
      }
      return _doc;
    }

    function validateMessage( _doc ) {
      if ( !_doc.message ) {
        throw new ReferenceError( 'A propriedade message é obrigatória' );
      }
      return _doc;
    }

    function save( _doc ) {
      return news.save( _doc );
    }

  }

  function list( req, res ) {

    Promise.resolve()
      .then( query )
      .then( _news => res.status( 200 ).json( _news ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function query() {
      return news.query();
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
      return news.update( { _id }, _doc );
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
      return news.logicalRemove( { _id } );
    }

  }

  function findOne( req, res ) {
    const { _id } = req.params;

    Promise.resolve( _id )
      .then( validateId )
      .then( find )
      .then( _news => res.status( 200 ).json( _news ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateId( _id ) {
      if ( typeof _id !== 'string' || _id.length < 24 ) {
        throw new Error( 'A propriedade _id é inválida' );
      }

      return _id;
    }

    function find( _id ) {
      return news.get( { _id } );
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