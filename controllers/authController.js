const passport = require('passport')

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Faild Login!',
    successRedirect: '/',
    successFlash: 'You are now logged in!'
})

exports.loginWithTwitter = passport.authenticate('twitter', {
    failureRedirect: '/login',
    failureFlash: 'Faild Login!',
    successFlash: 'You are now logged in!'
})

exports.logout = (req, res) => {
    req.logout()
    req.flash('success', 'You are now logged out')
    res.redirect('/')
}

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
        return
    }
    req.flash('danger', 'opps You must be logged in to do that')
    res.redirect('/login')
}

exports.routesGuards= (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    next()
}