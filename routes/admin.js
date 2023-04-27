const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin_controller');
const passport = require('passport');
router.use((req, res, next) => {
    // changing layout for my admin panel
    req.app.set('layout', 'layouts/admin_layout');
    next();
});
// route for dashboard
router.get('/dashboard',passport.checkAuthentication,passport.checkAdmin,adminController.dashboard);


// route for show all users
router.get('/users',passport.checkAuthentication,passport.checkAdmin,adminController.allUsers);


// route for render new user page by admin
router.get('/users/add',passport.checkAuthentication,passport.checkAdmin,adminController.addEmployee);

// route for adding new user by admin
router.post('/users/save',passport.checkAuthentication,passport.checkAdmin,adminController.createEmployee);

// route for edit the existing user
router.get('/users/edit/:id',passport.checkAuthentication,passport.checkAdmin,adminController.editEmployee);

router.get('/users/promote/:id',passport.checkAuthentication,passport.checkAdmin,adminController.promote);

// route for delete the existing user
router.get('/users/delete/:id',passport.checkAuthentication,passport.checkAdmin,adminController.deleteEmployee);

router.get('/users/review/:id',passport.checkAuthentication,passport.checkAdmin,adminController.userReviews); 


router.post('/users/review/get',passport.checkAuthentication,passport.checkAdmin,adminController.getReview);


router.get('/employee/assign',passport.checkAuthentication,passport.checkAdmin,adminController.assign);

router.post('/employee/assign/all',passport.checkAuthentication,passport.checkAdmin,adminController.getEmployee);

router.post('/employee/assign/new',passport.checkAuthentication,passport.checkAdmin,adminController.assignEmployee);

router.post('/employee/assign/remove',passport.checkAuthentication,passport.checkAdmin,adminController.removeAssigned);

router.use('/reviews',require('./review'));

module.exports = router;