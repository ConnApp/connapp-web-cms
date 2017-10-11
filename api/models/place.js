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
    collectionName = 'places',
    placeSchema = new Schema({
      /**
      * Nome do local.
      * @type {String}
      */
      name: {
        type: String,
        required: true
      },
      /**
      * Imagem com o mapa do local.
      * @type {String}
      */
      mapImage: {
        type: String
      },
      /**
      * Define se o local está ativo.
      * @type {Boolean}
      */
      active: {
        type: Boolean,
        default: true
      },
      /**
      * Data de criação do local.
      * @type {Date}
      */
      createAt: {
        type: Date,
        default: Date.now
      },
      /**
      * Data da última vez que os dados do local foi atualizado.
      * @type {String}
      */
      lastUpdate: {
        type: Date,
        default: Date.now
      }
    }, { collection: collectionName })

  placeSchema.pre('save', function (next) {
    this.lastUpdated = new Date()
    dispatchOnSave(this, collectionName)
    next()
  })

  return mongoose.model(collectionName, placeSchema)
}
