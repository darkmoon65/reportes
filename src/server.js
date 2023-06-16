const express = require('express')
const server = express()

server.set('PORT', 3000 || process.env)

//rutas
server.use('/api/', require('./routes/api.routes'))

//statics
server.use(express.static(__dirname + "/public"))

//starts server
server.listen(server.get('PORT'), ()=>{
    console.log("server running on port : " + server.get('PORT'))
})