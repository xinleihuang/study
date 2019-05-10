const express = require('express')
const app = express()
const port = 3000

// middleware function request time
const requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    next()
}

app.use(requestTime)

// middleware function myLogger
const myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

app.use(myLogger)

// GET method route
app.get('/', (req, res) => {
    let responseText = 'Hello World!<br>'
    responseText += '<small>Requested at: ' + req.requestTime + '</small>'
    res.send(responseText)
})

app.get('/user/:id', function (req, res, next) {
    if (req.params.id === '0') {
        next('route')
    } else {
        next()
    }
}, function (req, res, next) {
    res.send('regular')
})

app.get('/user/:id', function (req, res, next) {
    res.send("special")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))