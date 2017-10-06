const
  mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema;

module.exports = function() {
  const
    collectionName = 'info',
    newsSchema = new Schema({
      /**
      * Titulo da informação.
      * @type {String}
      */
      title: {
        type: String,
        required: true
      },
      /**
      * Mensagem da informação
      * @type {String}
      */
      message: {
        type: String,
        required: true
      },
      /**
      * Define se o informação está ativo.
      * @type {Boolean}
      */
      active: {
        type: Boolean,
        default: true
      },
      /**
      * Data de criação do informação.
      * @type {Date}
      */
      createAt: {
        type: Date,
        default: Date.now
      },
      /**
      * Data da última vez que os dados do informação foi atualizado.
      * @type {String}
      */
      lastUpdate: {
        type: Date,
        default: Date.now
      }
    }, { collection: collectionName } );

  return mongoose.model( collectionName, newsSchema );
};
