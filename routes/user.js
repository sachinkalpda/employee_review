
const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');


router.get('/login',userController.login);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/user/login'},
),userController.createSession);

router.get('/logout',passport.checkAuthentication,userController.logout);

router.get('/register',userController.register);

router.post('/register/add',userController.createUser);







module.exports = router;