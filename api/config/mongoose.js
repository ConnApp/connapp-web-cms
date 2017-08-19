const
  log = require( 'debug' )( 'mongoose' ),
  mongoose = require( 'mongoose' );

module.exports = function( url ) {
  mongoose.connect( url, { useMongoClient: true } );

  mongoose.connection.on( 'connected', () => log( `Database connected in ${url}` ) );
  mongoose.connection.on( 'error', error => log( `Erro in connection: ${error}` ) );

  process.on( 'SIGINT', () => {
    mongoose.connection.close( () => {
      log( 'Database are closed' );
      process.exit( 0 );
    });
  });
}
