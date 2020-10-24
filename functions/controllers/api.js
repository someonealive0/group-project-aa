const express = require('express')
const path = require('path')
//require('dotenv').config({path: path.join(__dirname, "../../.env")})

const apiRouter = express.Router()

apiRouter.get('/api/test/*', function(req, res) {

  res.status(200).json({"message": "This is a test message from the API.", "rq": req.url})
})

module.exports = apiRouter