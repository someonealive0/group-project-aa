require('dotenv').config()

const express = require('express')
const cors = require('cors')
const apiRouter = require("./controllers/api.js")
const middleware = require("./utils/middleware.js")

const app = express()

//JSON request/response size (max)
app.use(express.json({limit: '50mb'}))
app.use(cors())
app.use(express.static('../build'))
app.use(middleware.requestLogger)
app.use(apiRouter)
app.use(middleware.errorMiddleware)


module.exports = app

