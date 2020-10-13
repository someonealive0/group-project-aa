const requestLogger = (request, response, next) => {
    console.log('*****')
    console.log(request.method, request.path)
    console.log("Req body:\n", request.body)
    console.log('*****')
    next()
}

const errorMiddleware = (error, request, response, next) => {
    console.log("Error:", error.name)
    response.status(500).send({ error: error.name })
}

module.exports = { requestLogger, errorMiddleware }