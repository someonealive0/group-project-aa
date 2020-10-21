require('dotenv').config()

const express = require('express')
const cors = require('cors')
const apiRouter = require("./controllers/api.js")
const middleware = require("./utils/middleware.js")

const api = express()

//JSON request/response size (max)
api.use(express.json())
api.use(cors())
api.use(middleware.requestLogger)
api.use(apiRouter)
api.use(middleware.errorMiddleware)


module.exports = api

