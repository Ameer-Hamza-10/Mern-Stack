const express = require('express')
const services = require('../Controllers/service-controller')

const router = express.Router()


router.route('/services').get(services)

module.exports = router