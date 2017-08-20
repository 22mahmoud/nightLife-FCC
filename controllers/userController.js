const mongoose = require('mongoose')
const User = mongoose.model('User')
const promisify = require('es6-promisify')

exports.loginForm = (req, res) => {
    res.render('login', { title: 'Login' })
}

exports.registerForm = (req, res) => {
    res.render('register', { title: 'register' })
}

// middleware for validate register data before send i
exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name')
    req.checkBody('name', 'You must Supply a name!').notEmpty()
    req.checkBody('email', 'That Email is not valid').isEmail()
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false, 
        gmail_remove_subaddress: false
    })
    req.checkBody('password', 'Password Cannot be blank!').notEmpty()
    req.checkBody('password-confirm', 'Password Cannot be blank!').notEmpty()
    req.checkBody('password-confirm', 'Oops! yout password do not match').equals(req.body.password)
    
    const errors = req.validationErrors()
    if(errors){
        req.flash('error', errors.map(err => err.msg))
        res.render('register', { title: 'Register', body: req.body, flashes: req.flash() })
        return
    }
    next()
}
exports.register = async (req, res, next) => {
    const { email, name, password } = req.body
    const user = new User({ email, name})
    const register = promisify(User.register, User)
    try {
        await register(user, password)
    } catch(err) {
        throw err
    }
    next()
}
