const captainModel=require('../models/captain.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken');

module.exports.registerCaptain = async (req,res) => {
    //sabse pehle data dekhlo 
    console.log("Registering captain with data:", req.body);
    //ab validation ka result check karlo 
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }
    //check karo ki user pehle se toh exist nahin karta hain 
    const existingCaptain = await captainModel.find ({ email: req.body.email.toLowerCase() });
    if (existingCaptain.length > 0) {
        return res.status(400).json({ message: "Captain already exists with this email" });
    }
    //nahin toh ab user mein data daaln padega 
    const {fullName, email, password,vehicle} = req.body;
    //received data 
    console.log("Received data:", { fullName, email, password, vehicle });

    //ab hum captainModel mein data daalenge
    
    //isse pehle password hash karlo 
    const hashedPassword = await captainModel.hashPassword(password);

    const newCaptain= new captainModel({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email: email.toLowerCase(),
        password: hashedPassword, // Hash the password in the model or service layer
        vehicle:{
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
        }
        

    });
    //ab kya hai register hogya hain ab auth token jwt ka generate karenge 
        const token=newCaptain.generateAuthToken();
        await newCaptain.save(); // Save the captain to the database
        res.status(201).json({ captain: newCaptain, token });
        
}

//login a existing captain
module.exports.loginCaptain = async (req, res) => {
    console.log("Logging in captain with data:", req.body);
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
    }
    console.log("hello")
    const { email, password } = req.body;

    //check karo ki captain exist karta hain ya nahin 
    const existingCaptain = await captainModel.findOne({ email: email.toLowerCase() }).select('+password'); // select the password field explicitly
    if (!existingCaptain) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    
    //ab password compare karlo 
    const isPasswordValid = await existingCaptain.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    
    //ab auth token generate karlo 
    const token = existingCaptain.generateAuthToken();
    //tokenn ko cookie mein set karna padega
    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });
    res.status(200).json({ captain: existingCaptain, token });
}

//creating logout controller for captain
module.exports.logoutCaptain = async (req, res) => {
    //cookie se token delete karna 
    const token = req.cookies.token; // Assuming the token is stored in cookies
    if (!token) {
        return res.status(400).json({ message: "No token found, please log in first" });
    }
    // Clear the token cookie
    res.clearCookie('token'); // Clear the token cookie
    await blacklistTokenModel.create({token}); // Assuming you have a function to blacklist the token
    
    res.status(200).json({ message: "Captain logged out successfully" });
}

//get captain profile
module.exports.getCaptainProfile = async (req, res) => {
    //req.user mein captain ka data hoga
    console.log("Fetching captain profile for:", req.captain);
    if (!req.captain) {
        return res.status(404).json({ message: "Captain not found" });
    }
    //captain ki profile return kar do 
    res.status(200).json({ captain: req.captain });
}