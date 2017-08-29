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
      required: true
    }
  });

  return mongoose.model( collectionName, userSchema );
}
