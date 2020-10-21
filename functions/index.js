const functions = require('firebase-functions');
const api = require('./server.js')

exports.api = functions.https.onRequest(api)

