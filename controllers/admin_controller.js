const User = require('../models/user');
const Review = require('../models/review')
const bcrypt = require('bcrypt');


module.exports.dashboard =async function(req,res){
    let usersCount = await User.find().count();
    let reviewCount = await Review.find().count();
    return res.render('dashboard',{
        title : 'Dashboard | Admin Employee Review',
        usersCount : usersCount,
        reviewCount : reviewCount
    });
}



module.exports.allUsers = async function(req,res){
    try {
        let users = await User.find( { _id : {$nin : req.user.id} })
        
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

module.exports.promote = async function(req,res){
    try {
        let user = await User.findById(req.params.id);
        if(user){
            user.role = 'admin';
            await user.save();
            req.flash('success','User Promoted To Admin');
            return res.redirect('back');
        }
        req.flash('error','Invalid User');
        return res.redirect('back');
    } catch (error) {
        console.log('Error in promoting',error);
        return;
    }
}

module.exports.deleteEmployee = async function(req,res){
    try {
        let user = await User.findById(req.params.id);
        if(user){
            let assignedUsers =  await User.find({
                assigned : {$in : user.id},
            });
            let reviewers = await Review.find({
                reviewer : { $in : user.id}
            });
            for(let reviewer of reviewers){
                let reviewUser = await User.findById(reviewer.user);
                reviewUser.reviews.pull(reviewer._id);
                await reviewUser.save();
            }
            for(let employee of assignedUsers){
                employee.assigned.pull(user._id);
                await employee.save();
            }
            await Review.deleteMany( {_id : { $in : user.reviews}});
            await Review.deleteMany( { reviewer : user._id});

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

module.exports.assign = async function(req,res){
    try {
        let users = await User.find({
            role : 'user',
            _id : { $nin : req.user.id}
        });
        return res.render('assign_users',{
            title : 'Assign Employee | Admin Employee Review',
            employees : users,
        });
    } catch (error) {
        console.log('Error in assign',error);
        return;
    }
}


// ajax request for get all assigned and to be assigned employee

module.exports.getEmployee = async function(req,res){
    try {
        let assigned = await User.findById(req.body.employeeId).populate('assigned');
        let employees = assigned.assigned;
        employees.push(req.body.employeeId);
        let unassigned = await User.find({
            _id :  {$nin : employees},
            role : 'user',
        });
        employees.pull(req.body.employeeId);
        return res.json(200,{
            message : 'success',
            assigned : assigned,
            unassigned : unassigned,
        });
        
    } catch (error) {
        console.log('Error in getting employee',error);
        return;
    }
}   

module.exports.assignEmployee = async function(req,res){
    try {
        let employee = await User.findOne({
            _id : req.body.employeeId,
            assigned : {$nin : req.body.assignable}
        });
        if(employee){
            let assignable = await User.findById(req.body.assignable);
            if(assignable){
                employee.assigned.push(assignable._id);
                await employee.save();
                return req.res.json(200,{
                    message : 'User Assigned',
                    assigned : assignable,
                });
            }
            return res.json(200,{
                message : 'Invalid Employee'
            });
            
        }
        return res.json(200,{
            message : 'Invalid Employee'
        });
        
    } catch (error) {
        console.log('Error in assign',error);
        return;
    }
}

module.exports.removeAssigned = async function(req,res){
    try {
        let employee = await User.findById(req.body.employeeId);
        if(employee){
            let assigned = await User.findById(req.body.assigned);
            if(assigned){
                employee.assigned.pull(assigned._id);
                await employee.save();
                return res.json(200,{
                    message : 'Employee Removed',
                    status : true,
                });
            }
            return res.json(200,{
                message : 'Invalid Employee',
                status : false,
            });

        }
        return res.json(200,{
            message : 'Invalid Employee',
            status : false,
        });
    } catch (error) {
        console.log('Error in removing assigned',error);
        return;
    }
}


module.exports.userReviews = async function(req,res){
        try {
            let user = await User.findById(req.params.id).populate('reviews');
            let reviews = await Review.aggregate([
                {
                    $match : {
                        user : user._id,
                    }
                },

                {
                    $group : {
                        _id : '$stars',
                        total : { $sum : 1},     
                    },
                    
                },
                {
                    $sort : {
                        _id : -1,
                    }
                }
                
            ]);
            console.log(reviews);
            if(user){
                return res.render('user_reviews',{
                    title : `${user.name} Reviews | Admin Employee Review`,
                    employee  : user,
                    reviews : reviews,
                });
            }
            req.flash('error','Invalid Employee!');
            return res.redirect('back');
            
        } catch (error) {
            console.log('Error in user Reviews',error);
            return;
        }
}

module.exports.getReview = async function(req,res){
    try {
        let reviews = await Review.find({
            user : req.body.employee,
            stars : req.body.stars,
        }).populate('reviewer');
        return res.json(200,{
            message : 'success',
            reviews : reviews
        })

    } catch (error) {
        console.log('error in get review',error);
        return;
    }
}   