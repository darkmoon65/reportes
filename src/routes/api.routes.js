const express = require('express')
const datosController = require('../controllers/datos.controller')
const router = express.Router()

router.get('/datos', datosController)

module.exports = router