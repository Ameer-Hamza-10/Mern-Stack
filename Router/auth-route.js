const express = require('express')
const router = express.Router()
const auth_controller = require('../Controllers/auth-controller')
const {signupSchema,signinSchema} = require('../Validators/auth-validator')

const validate = require('../Middlewares/validate-middleware')
const authMiddleware = require('../Middlewares/aurh-middleware')


router.route('/').get(auth_controller.Home)

router.route('/registration').post(validate(signupSchema), auth_controller.Registration)

router.route('/login').post(validate(signinSchema),auth_controller.Login)

router.route('/user').get(authMiddleware,auth_controller.user)



module.exports = router