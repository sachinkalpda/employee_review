const express = require('express');

const router = express.Router();


const passport = require('passport');
const homeController = require('../controllers/home_controller');

router.get('/',passport.checkAuthentication,passport.checkUser,homeController.home);

router.use('/user',require('./user'));

router.use('/admin',require('./admin'));






module.exports = router;