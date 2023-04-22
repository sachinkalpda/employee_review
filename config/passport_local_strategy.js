const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

const bcrypt = require('bcrypt');


passport.use(new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true,
    },async function(req,email,password,done){
        try {
            // getting requested user
            let user = await User.findOne({email : email});

            // authenticating
            if(!user || !bcrypt.compareSync(password, user.password)){
                req.flash('error','Invalid Username/Password');
                return done(null, false);
            }
            return done(null,user);
        } catch (err) {
            confirm.log('Error in Passport Local',err);
            return done(err,false);
        }
    }
    
));

passport.serializeUser(function(user,done){
     done(null,user.id);
});

passport.deserializeUser(async function(id,done){
    try {
        const user = await User.findById(id);
        return done(null,user);
    } catch (err) {
        console.log("error in local strategy",err);
        return ;
        
    }
});

// middleware for checking user is authenticated or not
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/login');
}

// setting user information to locals
passport.setAuthenticatedUser = function(req,res,next){

    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;