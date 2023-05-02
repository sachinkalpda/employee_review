const User = require('../models/user');
const Review = require('../models/review');


// to show all reviews in admin panel
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
        return res.render('error');
    }
}


// for rendering the add review page
module.exports.addReview = async function(req,res){
    try {
        let users = await User.find({_id : {$nin : req.user.id}});
        return res.render('add_review',{
            title : 'All Reviews | Admin Employee Review',
            users : users,
        });
        
    } catch(error) {
        console.log('Error in review',error);
        return res.render('error');
    }
}

// for adding a new review for a user by admin
module.exports.createReview = async function(req,res){
    try {
        let assignedUser = await Review.find({ 
            assigned :  req.user._id,
            _id : req.body.employee,
            });

        if(assignedUser){
            let user = await User.findById(req.body.employee);
            let reviewer = await User.findById(req.user._id);
            if(reviewer){
                if(user){
                    let review = await Review.create({
                        review : req.body.review,
                        feedback : req.body.feedback,
                        user : req.body.employee,
                        reviewer : req.user._id,
                        stars : req.body.rate,
                    });
                    if(review){
                        user.reviews.push(review._id);
                        await user.save();
                        reviewer.assigned.pull(user._id);
                        await reviewer.save();
                        req.flash('success','Review Added!');
                        return res.redirect('/');
                    }
                    req.flash('error','Something Went Wrong!');
                    return res.redirect('back');
    
                }
                req.flash('error','Invalid Employee!');
                return res.redirect('back');
            }
            req.flash('error','Invalid Reviewer!');
            return res.redirect('back');
            
        }
        req.flash('error',"User Not Assigned!");
        return res.redirect('back');

        
    } catch (error) {
        console.log('Error in creating review',error);
        return res.render('error');
    }
}

// for viewing the review information
module.exports.view = async function(req,res){
    try {
        let reveiw = await Review.findById(req.params.id).populate('user').populate('reviewer');
        if(reveiw){
            return res.render('review',{
                title : 'Review Information | Admin Employee Review',
                review : reveiw
            });
        }
        req.flash('error','Invalid Review!');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in review view',error);
        return res.render('error');
    }
}

// to delete the review in admin panel

module.exports.delete = async function(req,res){
    try {
        let review = await Review.findById(req.params.id);
        if(review){
            let user = await User.findById(review.user);
            user.reviews.pull(review._id);
            await user.save();
            await review.deleteOne();
            return res.redirect('back');
        }
        req.error('error','Invalid Review');
        return;
    } catch (error) {
        console.log('Error in review',error);
        return res.render('error');
    }
}