module.exports = function( app ) {
  const
    Model = app.models.user,
    user = require( '../lib/mongoose')( Model );

  function createUser( req, res ) {
    let doc = req.body;

    Promise.resolve( doc )
      .then( validateName )
      .then( validateGroup )
      .then( validatePassword )
      .then( validateEmail )
      .then( save )
      .then( resolveResponse )
      .catch( rejectResponse );

    function validateName( _doc ) {
      if ( !( _doc.firstName || _doc.lastName ) ) {
        throw new Error( 'O nome do usuário deve ser informado.' );
      }
      return _doc;
    }

    function validateGroup( _doc ) {
      const
        groups = [ 'admin', 'user' ],
        validGroup = group => _doc.group === group,
        isValid = groups.some( validGroup );

      if( !isValid ) {
        throw new Error( 'O grupo informado não é válido.' );
      }

      return _doc;
    }

    function validateEmail( _doc ) {
      return new Promise( ( resolve, reject ) => {
        user.get( { email: _doc.email } )
        .then( userDoc => {
          if ( userDoc ) {
            return reject( new Error( 'O email informada já está sendo usado por outro usuário' ) );
          }

          resolve( _doc );
        });
      });
    }

    function validatePassword( _doc ) {
      if ( !_doc.password || _doc.password.length < 8 ) {
        throw new Error( 'A senha não pode está vazia ou ser menor que 8 caracteres' );
      }
      return _doc;
    }

    function save( _doc ) {
      return new Promise( ( resolve, reject ) => {
        user.save( _doc )
          .then( _user => resolve( _user ) )
          .catch( error => reject( error ) );
      });
    }

    function resolveResponse( _user ) {
      res.status( 200 ).json( _user );
    }

    function rejectResponse( error ) {
      console.log( error );
      res.status( 500 ).json( error );
    }
  }

  return {
    createUser
  };
};
