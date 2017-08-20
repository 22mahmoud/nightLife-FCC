const mongoose = require('mongoose')
const passport = require('passport')
const User = mongoose.model('User')
const promisify = require('es6-promisify')
const Strategy = require('passport-twitter').Strategy

passport.use(User.createStrategy())

// Set up Twitter Strategy
passport.use(new Strategy({
    consumerKey: 'Uxxdfkz4xxBv3kTUmLVblmYs8',
    consumerSecret: 'LHtnWZUpMgdDMyWeXgUoQtohKOrvTv5uIQSiA22I7Bw8YjuXZZ',
    callbackURL: "/twitter/callback"
  },
    async function(token, tokenSecret, profile, cb) {
        const email = profile.emails ? profile.emails[0] :  `${profile.username}@twitter.com`
        try {
            const user =  await User.findOne({ twitterId: profile.id })        
            if(user) {
                return cb(null, user)
            } else {
                const newUser = await User.create({
                    email,
                    name: profile.displayName,
                    twitterId: profile.id
                })
                return cb(null, newUser)
            }
        } catch(err) {
            throw err
        }
    }
))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
