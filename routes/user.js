
const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

const reviewController = require('../controllers/review_controller');

// route for render login page
router.get('/login',userController.login);

// route for login action
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/user/login'},
),userController.createSession);

// route for logout
router.get('/logout',passport.checkAuthentication,userController.logout);


// route for render the register page
router.get('/register',userController.register);

// router for adding a new user
router.post('/register/add',userController.createUser);

// route for render review page for user
router.get('/review/:id',passport.checkAuthentication,passport.checkUser,userController.reviewEmployee);

// route for save the review page for user
router.post('/review/save',passport.checkAuthentication,passport.checkUser,reviewController.createReview);







module.exports = router;