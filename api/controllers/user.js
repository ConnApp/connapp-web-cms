const 
  Promise = require( 'promise' ),
  bcrypt = require( 'bcrypt' );

module.exports = function( app ) {
  const
    Model = app.models.user,
    user = require( '../lib/mongoose')( Model );

  /**
  * Responde a requisição com status de sucesso e envia um json com os dados do usuário.
  * @memberof User
  * @type {Method}
  * @private
  * @param {Object} _doc - Dados do usuário
  */
  function _resolveResponse( res, data ) {
    res.status( 200 ).json( data );
  }
  /**
  * Responde a requisição com status de error e envia um json com o objeto do erro.
  * @memberof User
  * @type {Method}
  * @private
  * @param {Object} error - Objeto com messagem e stack de erro.
  */
  function _rejectResponse( res, { message, stack } ) {
    res.status( 500 ).send( { message, stack } );
  }
  /**
  * Cria um nove usuário.
  * @memberof User
  * @method POST
  */
  function create( req, res ) {
    let doc = req.body;

    Promise.resolve( doc )
      .then( validateName )
      .then( validateGroup )
      .then( validatePassword )
      .then( validateEmail )
      .then( makeHashWithPass )
      .then( save )
      .then( _resolveResponse.bind( null, res ) )
      .catch( _rejectResponse.bind( null, res ) );

    /**
    * Verifica se o nome e sobrenome foi enviado.
    * @memberof User.create
    * @type {Method}
    * @param {Object} _doc - Dados do usuário
    * @return {Object} _doc - Dados do usuário
    */
    function validateName( _doc ) {
      if ( !( _doc.firstName || _doc.lastName ) ) {
        throw new Error( 'O nome do usuário deve ser informado.' );
      }
      return _doc;
    }
    /**
    * Verifica se o grupo de usuário inforamdo é válido.
    * @memberof User.create
    * @type {Method}
    * @param {Object} _doc - Dados do usuário
    * @return {Object} _doc - Dados do usuário
    */
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
    /**
    * Verifica na base de dados se o email já está sendo utilizado por outro usuário.
    * @memberof User.create
    * @type {Method}
    * @param {Object} _doc - Dados do usuário
    * @return {Promise} _doc - Dados do usuário
    */
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
    /**
    * Verifica se a senha possuí no minimo 8 caracteres
    * @memberof User.create
    * @type {Method}
    * @param {Object} _doc - Dados do usuário
    * @return {Object} _doc - Dados do usuário
    */
    function validatePassword( _doc ) {
      if ( !_doc.password || _doc.password.length < 8 ) {
        throw new Error( 'A senha não pode está vazia ou ser menor que 8 caracteres' );
      }
      return _doc;
    }
    /**
    * Gera uma criptografia da senha informada.
    * @memberof User.create
    * @type {Method}
    * @param {Object} _doc - Dados do usuário
    * @return {Object} _doc - Dados do usuário
    */
    function makeHashWithPass( _doc ) {
      return new Promise( ( resolve, reject ) => {
        const SALT = 10;
        bcrypt.hash( _doc.password, SALT )
          .then( hash => {
            _doc.password = hash;
            resolve( _doc );
          })
          .catch( reject );
      });
    }
    /**
    * Armazena os dados do usuário no banco de dados.
    * @memberof User.create
    * @type {Method}
    * @param {Object} _doc - Dados do usuário
    * @return {Object} _doc - Dados do usuário
    */
    function save( _doc ) {
      return new Promise( ( resolve, reject ) => {
        user.save( _doc )
          .then( _user => resolve( _user ) )
          .catch( error => reject( error ) );
      });
    }
  }
  /**
  * Busca todos os usuários da base de dados.
  * @memberof User
  * @method GET
  */
  function list( req, res ) {
    Promise.resolve()
      .then( query )
      .then( _resolveResponse.bind( null, res ) )
      .catch( _rejectResponse.bind( null, res ) );

    /**
    * Busca todos os usuários do banco de dados.
    * @memberof User.list
    * @return {Promise} Promise - Promise resolvida com um array de usuários.
    */
    function query() {
      return new Promise( ( resolve ) => user.query( {} ).then( resolve ) );
    }
  }
  /**
  * Remove um usuário fazendo uma busca pelo email.
  * @memberof User
  * @method DELETE
  */
  function remove( req, res ) {
    const email = req.params.email;
    
    if ( !email ) return _rejectResponse( new Error( 'Não foi possivel remover o usuário' ) );

    Model.remove( { email } )
      .then( _resolveResponse.bind( null, res ) )
      .catch( _rejectResponse.bind( null, res ) );
  }
  /**
  * Desativa o usuário fazendo uma busca pelo email.
  * @memberof User
  * @method DELETE
  */
  function disable( req, res ) {
    const email = req.body.email;

    if ( !email ) return _rejectResponse( new Error( 'Não foi possivel remover o usuário' ) );

    user.logicalRemove( { email } )
      .then( _resolveResponse.bind( null, res ) )
      .catch( _rejectResponse.bind( null, res ) );
  }
  /**
  * Desativa o usuário fazendo uma busca pelo email.
  * @memberof User
  * @method PUT
  */
  function update( req, res ) {
    const doc = req.body;

    Promise.resolve( doc )
      .then( validateEmail )
      .then( updateDate )
      .then( setNewData )
      .then( _resolveResponse.bind( null, res ) )
      .catch( _rejectResponse.bind( null, res) );
    
    /**
    * Verifica se o email existe.
    * @memberof User.update
    * @type {Function}
    * @private
    * @param {Object} _doc Dados do usuário que serão atualizados.
    * @return {Object}
    */
    function validateEmail( _doc ) {
      if ( !_doc.email ) {
        throw new Error( 'Email do usuário não é valido.' );
      }

      return _doc;
    }
    /**
    * Atualiza da data da propriedade lastUpdate.
    * @memberof User.update
    * @type {Function}
    * @private
    * @param {Object} _doc Dados do usuário que serão atualizados.
    * @return {Object}
    */
    function updateDate( _doc ) {
      _doc.lastUpdate = Date.now();
      return _doc;
    }
    /**
    * Atualiza os dados do usuário no banco.
    * @memberof User.update
    * @type {Function}
    * @private
    * @param {Object} _doc Dados do usuário que serão atualizados.
    * @return {Promise}
    */
    function setNewData( _doc ) {
      return user.update( { email: _doc.email }, _doc );
    }
  }

  function findOne( req, res ) {
    const userId = req.params._id;

    Promise.resolve( userId )
      .then( validateId )
      .then( find )
      .then( _resolveResponse.bind( null, res ) )
      .catch( _rejectResponse.bind( null, res ) );

    function validateId( _userId ) {
      if ( typeof _userId !== 'string' || _userId.length < 24 ) {
        throw new Error( 'A propriedade _id é inválida' );
      }

      return _userId;
    }

    function find( _userId ) {
      return user.get( { _id: userId } );
    }

  }

  return {
    create,
    list,
    remove,
    disable,
    update,
    findOne
  };
};
