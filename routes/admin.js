const express = require('express');

const router = express.Router();

const dashboardController = require('../controllers/dashboard_controller');
const passport = require('passport');
router.use((req, res, next) => {
    // changing layout for my admin panel
    req.app.set('layout', 'layouts/admin_layout');
    next();
});
// route for dashboard
router.get('/dashboard',passport.checkAuthentication,passport.checkAdmin,dashboardController.dashboard);


// route for show all users
router.get('/users',passport.checkAuthentication,passport.checkAdmin,dashboardController.allUsers);


// route for render new user page by admin
router.get('/users/add',passport.checkAuthentication,passport.checkAdmin,dashboardController.addEmployee);

// route for adding new user by admin
router.post('/users/save',passport.checkAuthentication,passport.checkAdmin,dashboardController.createEmployee);

// route for edit the existing user
router.get('/users/edit/:id',passport.checkAuthentication,passport.checkAdmin,dashboardController.editEmployee);

// route for delete the existing user
router.get('/users/delete/:id',passport.checkAuthentication,passport.checkAdmin,dashboardController.deleteEmployee);


router.get('/employee/assign',passport.checkAuthentication,passport.checkAdmin,dashboardController.assign);

router.post('/employee/assign/all',passport.checkAuthentication,passport.checkAdmin,dashboardController.getEmployee);

router.post('/employee/assign/new',passport.checkAuthentication,passport.checkAdmin,dashboardController.assignEmployee);

router.post('/employee/assign/remove',passport.checkAuthentication,passport.checkAdmin,dashboardController.removeAssigned);

router.use('/reviews',require('./review'));

module.exports = router;