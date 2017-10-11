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
    collectionName = 'speakers',
    speakerSchema = new Schema({
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
      * Nome do local onde trabalha
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
    }, { collection: collectionName })

  speakerSchema.pre('save', function (next) {
    this.lastUpdated = new Date()
    dispatchOnSave(this, collectionName)
    next()
  })

  return mongoose.model(collectionName, speakerSchema)
}
