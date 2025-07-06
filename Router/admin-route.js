const admin_controller = require("../Controllers/admin-controller")
const admin_middleware = require("../Middlewares/admin=middleware")
const authMiddleware = require('../Middlewares/aurh-middleware')

const express = require('express')
const router = express.Router()

router.route('/users').get(authMiddleware, admin_middleware, admin_controller.getAllUsers)
router.route('/users/:id').get(authMiddleware, admin_middleware, admin_controller.getUserById)
router.route('/users/update/:id').patch(authMiddleware, admin_middleware, admin_controller.updateUserById)
router.route('/contacts').get(authMiddleware, admin_middleware, admin_controller.getAllContacts)
router.route('/users/delete/:id').delete(authMiddleware, admin_middleware, admin_controller.deleteUserById)
router.route('/contacts/delete/:id').delete(authMiddleware, admin_middleware, admin_controller.deleteContactById)


module.exports = router