const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    review : {
        type : String,
        required : true,
    },
    feedback : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    reviewer : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    stars :{
        type : Integer,
        required : true,
    }
});

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;