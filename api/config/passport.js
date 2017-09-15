const
  passport = require( 'passport' ),
  { Strategy } = require( 'passport-local' ),
  bcrypt = require( 'bcrypt' );

function localStrategy( app ) {
  const strategyOptions = { usernameField: 'email', passReqToCallback: true };

  /**
   * Função que será usada como estrategia local.
   * @param {Object} req 
   * @param {String} email 
   * @param {String} password 
   * @param {Function} done 
   */
  function authUser( req, email, password, done ) {
    const 
      Model = app.models.user,
      user = require( '../lib/mongoose' )( Model );
    /**
     * Verifica se o hash do usuário é igual ao password enviado.
     * @param {String} password 
     * @param {String} hash 
     */
    function verifyPassword( password, hash ) {
      return bcrypt.compareSync( password, hash );
    }
    /**
     * Busca um usuário ativo no banco e verifica se a senha é equivalente ao hash armazenado.
     */
    user.get( { email, active: true } )
      .then( _user => {
        if ( !_user ) return done( null, false, { message: 'usuário não existe ou está desativado' } );
        if ( !verifyPassword( password, _user.password ) ) return done( null, false, { message: 'a senha está incorreta' } );

        done( null, _user );
      })
      .catch( error => done( error ) );

  }

  /**
   * Definindo a estrategia de autenticação local
   */
  passport.use( new Strategy( strategyOptions, authUser ) );
}

function parseSession( app ) {
  const 
    Model = app.models.user,
    userModel = require( '../lib/mongoose' )( Model );

  passport.serializeUser( ( user, callback ) => {
    callback( null, user );
  });

  passport.deserializeUser( ( user, callback ) => {
    const { _id } = user;
    userModel.get( { _id, active: true } )
      .then( _user => callback( null, _user ) )
      .catch( callback );
  });

} 

module.exports = {
  localStrategy,
  parseSession
};
