const express = require('express');

const router = express.Router();

const passport = require('passport');
const reviewController = require('../controllers/review_controller');



router.get('/all',passport.checkAuthentication,passport.checkAdmin,reviewController.allReviews);

router.get('/add',passport.checkAuthentication,passport.checkAdmin,reviewController.addReview);

router.post('/save',passport.checkAuthentication,passport.checkAdmin,reviewController.createReview);

router.get('/delete/:id',passport.checkAuthentication,passport.checkAdmin,reviewController.delete);






module.exports = router;