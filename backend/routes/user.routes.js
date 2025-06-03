const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller');
const { body }=require("express-validator")
const authMiddleware=require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],userController.registerUser);
//ab user se data aayega toh mujhe use validate karna hoga naa ki jo data enter kiya hain user ne for registration yeh valid data hai yaa nahin

//iske liye we will use expressvalidator package 

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
],userController.loginUser);


function ashu(req,res,next){
    console.log("hello i m in ashu middleware");
    next();
}

//ab mujhe user profile chahiye

router.get('/profile', ashu,authMiddleware.authUser,userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);


module.exports=router;