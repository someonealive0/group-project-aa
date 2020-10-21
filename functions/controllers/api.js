const express = require('express')
const path = require('path')
//require('dotenv').config({path: path.join(__dirname, "../../.env")})

const apiRouter = express.Router()

apiRouter.get('/test/test_msg', function(req, res) {
  res.status(200).json({"message": "This is a test message from the API."})
})

module.exports = apiRouter