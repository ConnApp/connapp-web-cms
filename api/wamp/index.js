// Packages imports
const Wampy = require('wampy').Wampy

// Modules Imports
const CONFIG = require('./config.js')

// Exports Config object
module.exports.CONFIG = CONFIG
// console.log(module.exports.CONFIG)

// Websockets options
const wsOptions = {
  ws: CONFIG.WEBSOCKET.CLIENT,
  realm: CONFIG.WEBSOCKET.REALM
}

// Exports connection object
module.exports.connection = new Wampy(CONFIG.WEBSOCKET.URL, wsOptions)

module.exports.dispatcher = require('./dispatcher.js')
