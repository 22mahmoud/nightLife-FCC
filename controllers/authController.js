const passport = require('passport')

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Faild Login!',
    successRedirect: 'back',
    successFlash: 'You are now logged in!'
})

exports.loginWithTwitter = passport.authenticate('twitter', {
    failureRedirect: '/login',
    failureFlash: 'Faild Login!',
    successFlash: 'You are now logged in!'
})

exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
        return
    }
    req.flash('error', 'opps You must be logged in to do that')
    res.redirect('/login')
}