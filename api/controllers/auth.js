const
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
      .then( createSession.bind( req ) )
      .then( res.status( 200 ).json )
      .catch( res.status( 500 ).json );

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
        user.get( { email: _authData.email } )
          .then( _user => {
            if ( !_user ) throw new Error( 'Usuário não existe' );

            resolve( _user );
          })
          .catch( error => reject( error ) );
      });
    }
    /**
     * 
     * @param {Object} _user 
     */
    function authUser( _user ) {
      const isAuthenticated = bcrypt.compareSync( authData.password, _user.password );
      if ( !isAuthenticated ) throw new Error( 'Senha do usuário está incorreta.' );

      _user.isAuthenticated = isAuthenticated;
      return _user;
    }

    function createSession( req, _user ) {
      delete _user.password;
      req.session.user = _user;

      return  _user;
    }
  }

  return {
    renderLogin,
    signin
  }
}
