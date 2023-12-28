const express = require('express')
const router = express.Router()

// Controllers
const pages = new (require('../app/controllers/pages'))
const auth  = new (require('../app/controllers/auth'))
const admin = new (require('../app/controllers/admin'))

router.get('/', pages.welcome, admin.dashboard)

router.get('/login', auth.login)

router.get('/register', auth.register)

module.exports = router
