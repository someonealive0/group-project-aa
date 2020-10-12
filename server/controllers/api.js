require('dotenv').config()

const express = require('express')
const path = require('path')

const apiRouter = express.Router()

//Fallback URL
apiRouter.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, "/../../build/index.html"), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
})


module.exports = apiRouter