const
  Promise = require( 'promise' ),
  path = require( 'path' ),
  bcrypt = require( 'bcrypt' ),
  debug = require( 'debug' )( 'authController' );

module.exports = function( app ) {
  const
    Model = app.models.user,
    user = require( '../lib/mongoose' )( Model ),
    ROOT_PATH = process.env.PWD;

  function renderLogin( req, res ) {
    res.sendFile( path.join( ROOT_PATH, 'app/src/views/login.html' ) );
  }

  function signin( req, res ) {
    const authData = req.body;

    Promise.resolve( authData )
      .then( validateEmail )
      .then( validatePassword )
      .then( findUser )
      .then( authUser )
      .then( createSession.bind( null, req ) )
      .then( _user => res.status( 200 ).json( _user ) )
      .catch( error => res.status( 500 ).send( { message: error.message, stack: error.stack } ) );

    function validateEmail( _authData ) {
      if ( !( _authData && _authData.email ) ) {
        throw new Error( 'A propriedade email é obrigatória' );
      }

      return _authData;
    }

    function validatePassword( _authData ) {
      if ( !authData.password ) {
        throw new Error( 'A propriedade password é obrigatória' );
      }

      return _authData;
    }

    function findUser( _authData ) {
      return new Promise(( resolve, reject ) => {
        user.get( { email: _authData.email, active: true } )
          .then( _user => {
            if ( !_user ) throw new Error( 'Usuário não existe' );

            resolve( _user );
          })
          .catch( reject );
      });
    }
    /**
     * 
     * @param {Object} _user 
     */
    function authUser( _user ) {
      return new Promise( ( resolve, reject ) => {
        bcrypt.compare( authData.password, _user.password )
          .then( isAuthenticated => {
            if ( !isAuthenticated ) throw new Error( 'Senha do usuário está incorreta.' );
            _user.isAuthenticated = isAuthenticated;
            resolve( _user )
          })
          .catch( reject );
      });
    }

    function createSession( req, _user ) {
      delete _user.password;
      req.session.user = _user;

      return  _user;
    }
  }

  function signout( req, res, next ) {
    if ( req.session.user ) {
      req.session.destroy( error => {
        if ( error ) return res.status( 500 ).send( { error } );
        res.redirect( '/auth/signin' );
      });
    }
  }

  return {
    renderLogin,
    signin,
    signout
  }
}
