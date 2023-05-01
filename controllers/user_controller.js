const User = require('../models/user');
const Review = require('../models/review');

const { Validator } = require('node-input-validator');

const bcrypt = require('bcrypt');

module.exports.login = async function(req,res){
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
        req.flash('success','User Login Successfully');
        return res.redirect('/');
    }else if(req.user.role == 'admin'){
        req.flash('success','Admin Login Successfully');
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
        let v = new Validator(req.body,{
            name : 'required',
            email : 'required',
            password : 'required',
            confirm_password : 'required'
        });
        const matched = await v.check();
        if(!matched){
            return res.render('register',{
                errors : v.errors,
            });
        }
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
        return res.render('error');
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



module.exports.reviewEmployee = async  function(req,res){
    try {
        let user = await User.findById(req.params.id);
        if(user){
            return res.render('add_user_review',{
                employee : user,
            });
        }
        req.flash('error','Invalid User!');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in review',error);
        return res.render('error');
    }
}