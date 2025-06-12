const express=require('express');
const router=express.Router();
const captainController=require('../controllers/captain.controller');
const { body }=require("express-validator")
const authMiddleware=require('../middlewares/auth.middleware');

//register a new captain

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],captainController.registerCaptain);

//login a captain
router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],captainController.loginCaptain);


//logout a captain
router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);

//ab captain ki profile chahiye toh mujhe captain ki profile dekhni padegi
router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

module.exports=router;