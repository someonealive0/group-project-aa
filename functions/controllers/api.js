const express = require('express')
const path = require('path')
require('dotenv').config({path: path.join(__dirname, "../../.env")})

const apiRouter = express.Router()

apiRouter.get('/test_msg', function(req, res) {
  res.status(200).json({"message": "This is a test message from the server."})
})

//Fallback URL
apiRouter.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, "./../../build/index.html"), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
})


module.exports = apiRouter