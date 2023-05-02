const express = require('express');

const router = express.Router();

const passport = require('passport');
const reviewController = require('../controllers/review_controller');


// route for getting all reviews
router.get('/all',passport.checkAuthentication,passport.checkAdmin,reviewController.allReviews);

// route for render the add review page
router.get('/add',passport.checkAuthentication,passport.checkAdmin,reviewController.addReview);

// route for adding new review
router.post('/save',passport.checkAuthentication,passport.checkAdmin,reviewController.createReview);


// route for render the edit review page
router.get('/edit/:id',passport.checkAuthentication,passport.checkAdmin,reviewController.editReview);

// route for updating the review
router.post('/update/:id',passport.checkAuthentication,passport.checkAdmin,reviewController.updateReview);

// route for deleting for review
router.get('/delete/:id',passport.checkAuthentication,passport.checkAdmin,reviewController.delete);

// route for view the review information
router.get('/view/:id',passport.checkAuthentication,passport.checkAdmin,reviewController.view);






module.exports = router;