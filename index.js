const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const host = '0.0.0.0'

// Routes
app.use('/', require('./config/routes'))

app.listen(port, host, () => {
    console.log(`Example app listening on http://${host}:${port}`)
})
