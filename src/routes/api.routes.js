const express = require('express')
const datosController = require('../controllers/datos.controller')
const router = express.Router()

router.post('/datos', datosController)

module.exports = router