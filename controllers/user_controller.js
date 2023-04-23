const User = require('../models/user');

const bcrypt = require('bcrypt');

module.exports.login = function(req,res){
    if(req.isAuthenticated()){
        if(req.user.role == 'admin'){
            return res.redirect('/admin/dashboard');
        }
        if(req.user.role == 'user'){
            return res.redirect('/');
        }
        
    }
    return res.render('login');
}

module.exports.createSession = function(req,res){
    if(req.user.role == 'user'){
        req.flash('success','Login Successfully');
        return res.redirect('/');
    }else if(req.user.role == 'admin'){
        req.flash('success','Login Successfully');
        return res.redirect('/admin/dashboard');
    }
    
}


module.exports.register = function(req,res){
    if(req.isAuthenticated()){
        if(req.user.role == 'admin'){
            return res.redirect('/admin/dashboard');
        }
        if(req.user.role == 'user'){
            return res.redirect('/');
        }
        
    }
    return res.render('register');
}

module.exports.createUser = async function(req,res){
    try {
        if(req.body.password == req.body.confirm_password){
            let user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password,10)
            });
            if(user){
                req.flash('success','User Registered Successfully. Please Login To Continue');
                return res.redirect('/user/login');
            }
            req.flash('error','Something Went Wrong!');
            return res.redirect('back');
        }
        req.flash('error',"Password Doesn't Match");
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in Creating user',error);
        return;
    }
}

module.exports.logout = function(req,res){
    req.logout(function (err) {
        if (err) {
            console.log('Error', err);
            return;
        }
        req.flash('success', 'Logout Successfully');
        return res.redirect('/user/login');
    });
}