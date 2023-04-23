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
        type : Number,
        min : 1,
        max : 5,
        required : true,
    }
},{
    timestamps : true,
});

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;