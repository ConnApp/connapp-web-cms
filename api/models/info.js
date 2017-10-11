const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  dispatcher = require('../wamp/index.js').dispatcher;

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

module.exports = function () {
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
    }, { collection: collectionName })

  newsSchema.pre('save', function (next) {
    this.lastUpdated = new Date()
    dispatchOnSave(this, collectionName)
    next()
  })

  return mongoose.model(collectionName, newsSchema)
}
