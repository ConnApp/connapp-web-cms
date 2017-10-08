const
  mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

module.exports = function() {
  const
    collectionName = 'events',
    eventSchema = new Schema({
      /**
      * Nome do evento.
      * @type {String}
      */
      name: {
        type: String,
        required: true
      },
      /**
      * Data e hora que o evento irá começar.
      * @type {Date}
      */
      start: {
        type: Date,
        required: true
      },
      /**
      * Data e hora que o evento irá terminar.
      * @type {Date}
      */
      end: {
        type: Date,
        required: true
      },
      /**
      * Quantidade de pessoas que gostaram do evento.
      * @type {Number}
      */
      like: {
        type: Number,
        default: 0
      },
      /**
      * Palestrantes que irão ministrar o evento.
      * @type {Array}
      */
      speakers: [{
        type: ObjectId,
        ref: 'speakers'
      }],
      /**
      * Tipo de evento
      * @type {ObjectId}
      */
      eventType: {
        type: ObjectId,
        ref: 'eventtypes',
        required: true
      },
      /*
      * Ordem de precedência do evento
      * @type {Number}
      */
      order: {
        type: Number,
        default: 0
      },
      /**
      * Local onde o evento será realizado.
      * @type {ObjectId}
      */
      place: {
        type: ObjectId,
        ref: 'places',
        required: true
      },
      /**
      * Define se o evento está ativo.
      * @type {Boolean}
      */
      active: {
        type: Boolean,
        default: true
      },
      /**
      * Data de criação do evento.
      * @type {Date}
      */
      createAt: {
        type: Date,
        default: Date.now
      },
      /**
      * Data da última vez que os dados do evento foi atualizado.
      * @type {String}
      */
      lastUpdate: {
        type: Date,
        default: Date.now
      }
    }, { collection: collectionName } );

  return mongoose.model( collectionName, eventSchema );
};
