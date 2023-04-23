const User = require('../models/user');
const Review = require('../models/review');

module.exports.allReviews = async function(req,res){
    try {
        let reviews = await Review.find({user : { $nin : req.user.id}}).populate('user').populate('reviewer');
        if(reviews){
            return res.render('reviews',{
                title : 'All Reviews | Admin Employee Review',
                reviews : reviews,
            })
        }
        req.flash('error','Something Went Wrong!');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in review',error);
        return;
    }
}

module.exports.addReview = async function(req,res){
    try {
        let users = await User.find({_id : {$nin : req.user.id}});
        return res.render('add_review',{
            title : 'All Reviews | Admin Employee Review',
            users : users,
        });
        
    } catch(error) {
        console.log('Error in review',error);
        return;
    }
}


module.exports.createReview = async function(req,res){
    try {
        let user = await Review.find({ 
            reviewer : req.user._id,
            user : req.body.employee,
            });

        if(user.length == 0){
            let review = await Review.create({
                review : req.body.review,
                feedback : req.body.feedback,
                user : req.body.employee,
                reviewer : req.user._id,
                stars : req.body.rate,
            });
            if(review){
                req.flash('success','Review Added!');
                return res.redirect('/admin/reviews/all');
            }
            req.flash('error','Something Went Wrong!');
            return res.redirect('back');
        }
        req.flash('error',"Unauthorize action");
        return res.redirect('back');

        
    } catch (error) {
        console.log('Error in creating review',error);
        return;
    }
}

module.exports.delete = async function(req,res){
    try {
        let review = await Review.findById(req.params.id);
        if(review){
            await review.deleteOne();
            return res.redirect('back');
        }
        req.error('error','Invalid Review');
        return;
    } catch (error) {
        console.log('Error in review',error);
        return;
    }
}