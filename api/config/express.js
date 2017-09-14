const
  express = require( 'express' ),
  session = require( 'express-session' ),
  passport = require( 'passport' ),
  methodOverride = require( 'method-override' ),
  path = require( 'path' ),
  consign = require( 'consign' ),
  bodyParser = require( 'body-parser' ),
  databaseConnection = require( './mongoose' );

module.exports = (function() {
  const
    app = express(),
    PORT = process.env.PORT || 3000,
    ROOT_PATH = process.env.PWD;

  // ===# Set engine and views directory #=== //
  app.set( 'views', path.join( ROOT_PATH, 'app' ) );
  app.set ( 'view engine', 'html' );

  // ===# Set port #=== //
  app.set( 'port', PORT );
  
  // ===# Middlewares setup #=== //
  app.use ( bodyParser.json() );
  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.use( session( { name: 'connapp', secret: 'super_secret', saveUninitialized: false, resave: false } ) );
  app.use( methodOverride( 'X-HTTP-Method' ) );
  app.use( methodOverride( 'X-HTTP-Method-Override' ) );
  app.use( methodOverride( 'X-Method-Override' ) );

  // ===# Set public directory #=== //
  app.use( express.static( path.join( ROOT_PATH, 'app' ), { index: false } ) );
  app.get( '/', function( req, res, next ) {
    res.sendFile( path.join( ROOT_PATH, 'app/index' ) );
    next();
  });

  consign( { cwd: path.join( ROOT_PATH, 'api' ) } )
    .then( 'models' )
    .then( 'controllers' )
    .then( 'routes' )
    .into( app );

  // ===# Connect database #=== //
  databaseConnection( 'mongodb://super:admin@ds149763.mlab.com:49763/connapp-web-cms' );

  return app;
})();
