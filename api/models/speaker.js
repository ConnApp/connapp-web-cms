const
  mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema;

module.exports = function() {
  const
    collectionName = 'speaker',
    userSchema = new Schema({
      /**
      * Nome do palestrante.
      * @type {String}
      */
      name: {
        type: String,
        required: true
      },
      /**
      * Fotos do palestrante
      * @type {Object}
      */
      image: {
        perfil: {
          type: String
        },
        cover: {
          type: String
        },
        type: Object
      },
      /**
      * Profissão do palestrante.
      * @type {String}
      */
      profession: {
        type: String
      },
      /**
      * ??
      * @type {String}
      */
      institution: {
        type: String
      },
      /**
      * Descrição sobre o palestrante
      * @type {String}
      */
      about: {
        type: String
      },
      /**
      * Link para meios de comunicação do palestrante
      * @type {String}
      */
      media: {
        type: String
      },
      /**
      * Define se o palestrante está ativo.
      * @type {Boolean}
      */
      active: {
        type: Boolean,
        default: true
      },
      /**
      * Data de criação do palestrante.
      * @type {Date}
      */
      createAt: {
        type: Date,
        default: Date.now
      },
      /**
      * Data da última vez que os dados do palestrante foi atualizado.
      * @type {String}
      */
      lastUpdate: {
        type: Date,
        default: Date.now
      }
    }, { collection: collectionName } );

  return mongoose.model( collectionName, userSchema );
};
