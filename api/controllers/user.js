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
  * @param {Object} data - Dados do usuário
  */
  function _resolveResponse( res ) {
    return data => {
      res.status( 200 ).json( data );
    };
  }
  /**
  * Responde a requisição com status de error e envia um json com o objeto do erro.
  * @memberof User
  * @type {Method}
  * @private
  * @param {Object} error - Objeto com messagem e stack de erro.
  */
  function _rejectResponse( res ) {
    return error => {
      res.status( 500 ).send( { ...error } );
    };
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
      .then( _resolveResponse( res ) )
      .catch( _rejectResponse( res ) );

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
      return new Promise( resolve => {
        const SALT = 10;
        bcrypt.hash( _doc.password, SALT )
          .then( hash => {
            _doc.password = hash;
            resolve( _doc );
          });
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
      .then( selectUserPropertys )
      .then( _resolveResponse( res ) )
      .catch( _rejectResponse( res ) );

    /**
    * Busca todos os usuários do banco de dados.
    * @memberof User.list
    * @return {Promise} Promise - Promise resolvida com um array de usuários.
    */
    function query() {
      return user.query( {} );
    }
    /**
     * Projeta as propriedades públicas do usuário.
     * @memberof User.list
     * @return {Object}
     */
    function selectUserPropertys( users ) {
      return users.map( user => {
        return {
          _id: user._id,
          firstName: user.firstName, 
          lastName: user.lastName,
          email: user.email,
          group: user.group,
          lastUpdate: user.lastUpdate
        };
      });
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
      .then( _resolveResponse( res ) )
      .catch( _rejectResponse( res ) );
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
      .then( _resolveResponse( res ) )
      .catch( _rejectResponse( res ) );
  }
  /**
  * Atualiza o usuário fazendo uma busca pelo email.
  * @memberof User
  * @method PUT
  */
  function update( req, res ) {
    const { _id, firstName, lastName, password, group, ...doc } = req.body;

    Promise.resolve( { _id, firstName, lastName, password, group } )
      .then( validateId )
      .then( validateName )
      .then( validateGroup )
      .then( makeHashWithPass )
      .then( updateDate )
      .then( setNewData )
      .then( _resolveResponse( res ) )
      .catch( _rejectResponse( res) );
    
    /**
    * Verifica se o email existe.
    * @memberof User.update
    * @type {Function}
    * @private
    * @param {Object} _doc Dados do usuário que serão atualizados.
    * @return {Object}
    */
    function validateId( { _id, ..._doc } ) {
      if ( !_id || _id.length < 24 ) {
        throw new Error( 'A propriedade _id não é valido.' );
      }

      return { _id, ..._doc };
    }
    /**
     * Verifica se o nome e sobrenome existem para atribuir-los ao objeto _doc
     * que está sendo manipulado.
     * @param {Object} _doc
     * @return {Object}
     */
    function validateName( { firstName, lastName, ..._doc } ) {
      if ( firstName )  _doc.firstName = firstName;
      if ( lastName ) _doc.lastName = lastName;
      
      return { ..._doc };
    }
    /**
     * Verifica se o grupo e válido
     * @param {Object}
     * @return {Object}
     */
    function validateGroup( { group, ..._doc } ) {
      const
        groups = [ 'user', 'admin' ],
        isValid = groups.some( _group => _group === group );

      if ( isValid ) return { group, ..._doc };

      return { ..._doc };
    }
    /**
     * Verifica se existe algum password para ser criptografado. Se houver é geredo um hash
     * dele senão o fluxo da promise segue normalmente.
     * @param {Object} _doc
     * @return {Object}
     */
    function makeHashWithPass( { password, ..._doc } ) {
      if ( !password || password.length < 8 ) return { ...doc };

      return new Promise( resolve => {
        const SALT = 10;
        bcrypt.hash( password, SALT )
          .then( hash => {
            password = hash;
            resolve( { password, ..._doc } );
          });
      });
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
    function setNewData( { _id, ..._doc } ) {
      return user.update( { _id }, _doc );
    }
  }

  function findOne( req, res ) {
    const { _id } = req.params;

    Promise.resolve( _id )
      .then( validateId )
      .then( find )
      .then( _resolveResponse( res ) )
      .catch( _rejectResponse( res ) );

    function validateId( _id ) {
      if ( typeof _id !== 'string' || _id.length < 24 ) {
        throw new Error( 'A propriedade _id é inválida' );
      }

      return _id;
    }

    function find( _id ) {
      return new Promise( ( resolve, reject ) => {
        user
          .get( { _id } )
          .select( '_id email firstName lastName group lastUpdate createAt' )
          .exec( ( error, user ) => {
            if ( error ) return reject( error );
            resolve( user );
          });
      });
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