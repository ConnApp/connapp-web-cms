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
    { localStrategy, parseSession } = require( './passport' ),
    { isAuthenticated } = require( '../middlewares/authorize' ),
    { ROOT_PATH, PORT, DATABASE_URL } = require( './env' );

  // ===# Set engine and views directory #=== //
  app.set( 'views', path.join( ROOT_PATH, 'app' ) );
  app.set ( 'view engine', 'html' );

  // ===# Set port #=== //
  app.set( 'port', PORT );
  
  // ===# Middlewares setup #=== //
  app.use ( bodyParser.json( { limit: '5mb' } ) );
  app.use( bodyParser.urlencoded( { extended: true } ) );
  app.use( session( { name: 'connapp', secret: 'super_secret', saveUninitialized: false, resave: false } ) );
  app.use( methodOverride( 'X-HTTP-Method' ) );
  app.use( methodOverride( 'X-HTTP-Method-Override' ) );
  app.use( methodOverride( 'X-Method-Override' ) );
  app.use( passport.initialize() );
  app.use( passport.session() );
  
  // ===# Loading model, controller and routes into app instance #=== //
  consign( { cwd: path.join( ROOT_PATH, 'api' ) } )
    .then( 'models' )
    .then( 'controllers' )
    .then( 'routes' )
    .into( app );
  
  // ===# Define passport setting #=== //
  localStrategy( app );
  parseSession( app );
  
  // ===# Set public directory #=== //
  app.use( express.static( path.join( ROOT_PATH, 'app' ), { index: false } ) );

  // ===# Authorize moddleware #=== // 
  app.use( isAuthenticated );

  // ===# Send index html #=== //
  app.get( '/', ( req, res ) => res.sendFile( path.join( ROOT_PATH, 'app/index.html' ) ) );

  // ===# Connect database #=== //
  databaseConnection( DATABASE_URL );
  
  return app;
})();
