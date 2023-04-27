const express = require('express');

const router = express.Router();
router.use((req, res, next) => {
    // changing layout for my admin panel
    req.app.set('layout', 'layouts/layout');
    next();
});

const passport = require('passport');
const homeController = require('../controllers/home_controller');

// route for homepage
router.get('/',passport.checkAuthentication,passport.checkUser,homeController.home);

router.use('/user',require('./user'));

router.use('/admin',require('./admin'));






module.exports = router;