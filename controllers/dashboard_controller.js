const User = require('../models/user');
const bcrypt = require('bcrypt');


module.exports.dashboard = function(req,res){
    return res.render('dashboard');
}



module.exports.allUsers = async function(req,res){
    try {
        let users = await User.find({ _id : {$nin : req.user.id} });
        if(users){
            return res.render('users',{
                users : users
            })
        }
        req.flash('error','Something Went Wrong');
        return redirect('back');

    } catch (error) {
        console.log('Error in showing user in admin',error);
        return;
    }
}

module.exports.addEmployee = async function(req,res){
    return res.render('add_employee',{
        title : 'Add Employee | Admin Employee Review'
    });
}


module.exports.createEmployee = async function(req,res){
    try {
        if(req.body.password == req.body.confirm_password){
            let user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password,10)
            });
            if(user){
                req.flash('success','New Employee Registered Successfully.');
                return res.redirect('/admin/users');
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

module.exports.editEmployee = async function(req,res){
    try {
        let user = await User.findById(req.params.id);
        if(user){
            return res.render('add_employee',{
                title : 'Edit Employee | Admin Employee Review',
                employee : user,
            });
        }
        req.flash('error','Invalid User');
        return res.redirect('back');
    } catch (error) {
        console.log('Error in employee',error);
        return;
    }
}

module.exports.deleteEmployee = async function(req,res){
    try {
        let user = await User.findById(req.params.id);
        if(user){
            await user.deleteOne();
            req.flash('success','User Delete Successfully');
            return res.redirect('back');
        }
        req.flash('error','Invalid User');
        return res.redirect('back');

        
    } catch (error) {
        console.log('Error in Delete Employee',error);
        return;
    }
}