const express = require('express')
const router = express.Router()
const restaurantsController = require('../controllers/restaurantsController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const passport = require('passport')


// Do work here
router.get('/', restaurantsController.search)

router.get('/search', restaurantsController.searchResult)
// Login & Logout
router.get('/login', authController.routesGuards ,userController.loginForm)
router.post('/login', authController.login)
// Login with Twitter
router.get('/twitter', passport.authenticate('twitter'))
router.get('/twitter/callback', authController.loginWithTwitter, (req, res) => {
    res.redirect('back')
})
router.get('/logout', authController.logout)
// Register
router.get('/register', authController.routesGuards, userController.registerForm)
router.post('/register', 
    // 1. validate the registeration data
    userController.validateRegister,
    // 2. register ther user
    userController.register,
    //3. we need log them in
    authController.login
)

router.post('/search/:id/go', restaurantsController.goRestaurant)
router.get('/going', authController.isLoggedIn ,restaurantsController.getSaved)
module.exports = router
