const
  mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema;

module.exports = function() {
  const
    collectionName = 'news',
    newsSchema = new Schema({
      /**
      * Titulo da notícia.
      * @type {String}
      */
      title: {
        type: String,
        required: true
      },
      /**
      * Mensagem da notícia
      * @type {String}
      */
      message: {
        type: String,
        required: true
      },
      /**
      * Fotos da notícia.
      * @type {String}
      */
      images: [{
        type: String
      }],
      /**
      * Define se o notícia está ativo.
      * @type {Boolean}
      */
      active: {
        type: Boolean,
        default: true
      },
      /**
      * Data de criação do notícia.
      * @type {Date}
      */
      createAt: {
        type: Date,
        default: Date.now
      },
      /**
      * Data da última vez que os dados do notícia foi atualizado.
      * @type {String}
      */
      lastUpdate: {
        type: Date,
        default: Date.now
      }
    }, { collection: collectionName } );

  return mongoose.model( collectionName, newsSchema );
};
