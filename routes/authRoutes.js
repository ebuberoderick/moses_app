const express = require('express')
const router = express.Router()
const {login,forgot_password,register,get_user} = require('../controllers/userController')
const validator = require('../middleware/tokenValidationHandler')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/user').get(validator,get_user)
router.route('/forgotten-password').post(forgot_password)

module.exports = router