
const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

const reviewController = require('../controllers/review_controller');


router.get('/login',userController.login);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/user/login'},
),userController.createSession);

router.get('/logout',passport.checkAuthentication,userController.logout);

router.get('/register',userController.register);

router.post('/register/add',userController.createUser);


router.get('/review/:id',passport.checkAuthentication,passport.checkUser,userController.reviewEmployee);

router.post('/review/save',passport.checkAuthentication,passport.checkUser,reviewController.createReview);







module.exports = router;