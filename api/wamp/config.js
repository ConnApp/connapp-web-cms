// Imports and packages
const path = require('path')
const w3cws = require('websocket').w3cwebsocket

// Websocket/WAMP config object
const WEBSOCKET = {
  URL: 'ws://localhost:8080/ws',
  REALM: 'realm1',
  CLIENT: w3cws
}

module.exports = {
  WEBSOCKET
}
