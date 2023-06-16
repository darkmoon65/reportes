const express = require('express')
const router = express.Router()

router.get('/datos', (req, res) => {
    res.json([{
        "hola" : "123"
    }])
})

module.exports = router