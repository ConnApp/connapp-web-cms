const
  mongoose = require( 'mongoose' ),
  Schema = mongoose.Schema;

module.exports = function() {
  const
    collectionName = 'local',
    userSchema = new Schema({
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
    }, { collection: collectionName } );

  return mongoose.model( collectionName, userSchema );
};
