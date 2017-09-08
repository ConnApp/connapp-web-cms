const
  mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema;

module.exports = function() {
  const
    collectionName = 'user',
    userSchema = new Schema({
      /**
      * Primeiro nome do usuário.
      * @type {String}
      */
      firstName: {
        type: String,
        required: true
      },
      /**
      * Sobrenome do usuário.
      * @type {String}
      */
      lastName: {
        type: String,
        required: true
      },
      /**
      * Email do usuário.
      * @type {String}
      */
      email: {
        type: String,
        required: true,
        index: {
          unique: true
        }
      },
      /**
      * Senha do usuário.
      * @type {String}
      */
      password: {
        type: String,
        required: true
      },
      /**
      * Nível de acesso do usuário.
      * @type {String}
      */
      group: {
        type: String,
        enum: [ 'user', 'admin' ],
        default: 'user'
      },
      /**
      * Define se o usuário está ativo.
      * @type {Boolean}
      */
      active: {
        type: Boolean,
        default: true
      },
      /**
      * Data de criação do usuário.
      * @type {Date}
      */
      createAt: {
        type: Date,
        default: Date.now
      },
      /**
      * Data da última vez que o usuário foi atualizado.
      * @type {String}
      */
      lastUpdate: {
        type: Date,
        default: Date.now
      }
    }, { collection: collectionName } );

  return mongoose.model( collectionName, userSchema );
};
