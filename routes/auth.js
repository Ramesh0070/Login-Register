const { Router } = require('express');
const {returnHomePage ,returnSignupPage, returnLoginPage, createUser, loginUser, logoutUser} = require('../controllers/authController')
const router = Router();
const validateMiddleware = require('../middleware/authMiddleware')

router.get('/home', returnHomePage)
router.get('/register', returnSignupPage)
router.post('/register', validateMiddleware ,createUser)
router.get('/login', returnLoginPage)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

module.exports = router