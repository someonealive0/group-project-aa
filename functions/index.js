const functions = require('firebase-functions');
const app = require('./server.js')

exports.app = functions.https.onRequest(app)

