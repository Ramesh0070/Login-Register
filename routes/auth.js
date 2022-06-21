const { Router } = require('express');
const {returnHomePage ,returnSignupPage, returnLoginPage, createUser, loginUser, logoutUser} = require('../controllers/authController')
const router = Router();

router.get('/home', returnHomePage)
router.get('/register', returnSignupPage)
router.post('/register', createUser)
router.get('/login', returnLoginPage)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

module.exports = router