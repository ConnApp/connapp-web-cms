const mongoose = require( 'mongoose' );

module.exports = function( Model ) {
  // if ( !( Model instanceof mongoose.model ) ) throw new Error( 'Invalid mongoose model ' );

  function get( query = {} ) {
    return Model.findOne( query );
  }

  function query( query = {} ) {
    return Model.find( query );
  }

  function save( doc ) {
    let _doc;

    try {
      _doc = new Model( doc );
      return _doc.save();
    } catch( error ) {
      return new Promise(( resolve, reject ) => reject( error ));
    }

  }

  function update( query = { _id: undefined }, doc, options = { multi: false } ) {
    try {
      return Model.update( query, doc, options );
    } catch( error ) {
      return new Promise(( resolve, reject ) => reject( error ));
    }

  }

  function logicalRemove( query ) {
    return Model.update( query, { $set: { active: false, lastUpdate: Date.now() } } );
  }

  return {
    get,
    query,
    save,
    update,
    logicalRemove
  };
};
