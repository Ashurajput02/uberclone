const express=require('express');
const router=express.Router();
const captainController=require('../controllers/captain.controller');
const { body }=require("express-validator")


//register a new captain

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],captainController.registerCaptain);


module.exports=router;