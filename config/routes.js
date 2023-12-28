const express = require('express')
const router = express.Router()

// Controllers
const pages = new (require('../app/controllers/pages'))
const auth  = new (require('../app/controllers/auth'))

router.get('/', pages.welcome)

router.get('/register', auth.register)

module.exports = router
