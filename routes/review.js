const express = require('express');

const router = express.Router();

const passport = require('passport');
const reviewController = require('../controllers/review_controller');



router.get('/all',passport.checkAuthentication,passport.checkAdmin,reviewController.allReviews);






module.exports = router;