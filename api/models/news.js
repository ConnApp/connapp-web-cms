const
  mongoose = require( 'mongoose' ),
  dispatcher = require('../wamp/index.js').dispatcher
  Schema = mongoose.Schema;

const dispatchOnSave = (doc, modelName) => {
  const _id = doc._id.toString(),
        data = {...doc._doc}

  // Dispatches for realtimeUpdate
  if (doc.isNew) {
    dispatcher.insertToApp(modelName, data)
  } else {
    dispatcher.updateDocumentToApp(modelName, _id, data)
  }
}

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
      * Capa da notícia.
      * @type {String}
      */
      cover: {
        type: String
      },
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

  newsSchema.pre('save', function(next){
    this.lastUpdated = new Date()
    dispatchOnSave(this, collectionName)
    next()
  })

  return mongoose.model( collectionName, newsSchema );
};
