const User = require('../models/user');


// for rendering the user home page
module.exports.home =async  function(req,res){
    try {
        let user = await User.findById(req.user.id).populate('assigned');
        if(user){
            return res.render('home',{
                title : 'Homepage | Employee Review',
                user : user,
            });
        }
        req.flash('error','Something Went Wrong!');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in Homepage',error);
        return res.render('error');
    }
    
}