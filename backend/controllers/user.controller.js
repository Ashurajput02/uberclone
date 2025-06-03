const blacklistToken = require('../models/blacklistToken');
const userModel=require('../models/user.model')
const userService=require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken');
module.exports.registerUser = async (req, res) => {
    console.log("Registering user with data:", req.body);
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("Request body:", req.body);
    const {fullName,email,password} = req.body;
    console.log("hello")
    console.log("Fullname:", fullName);
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname:fullName.firstName,
        lastname: fullName.lastName,
        email: email.toLowerCase(),
        password: hashedPassword
});

    const token=user.generateAuthToken();
    user.save();
    console.log("User registered successfully:", user);
    res.status(201).json({user});
}

//to login a user
module.exports.loginUser = async (req, res) => {
    console.log("Logging in user with data:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    console.log("Email:", email);
    
    const user = await userModel.findOne({ email: email.toLowerCase() }).select('+password'); // select the password field explicitly
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    else{
       // console.log("user found:", user);//ab hamne jab find query lagayi toh user mil toh gya lekin becoz of select:false 
        //iss user mein bydefault passowrd nahi aayega usi ke liye humne select kiya tha +password
        
        //checking if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        else {
            console.log("hello")
            const token = user.generateAuthToken();
            console.log("User logged in successfully:", user);
            res.status(200).json({ user, token });
        } 

    }
}


module.exports.getUserProfile = async (req, res) => {

    //TOH idhar hamein ek middleware ki zaroorat hain jo check karega ki konsa user logged in hain and then uski 
    //details ko fetch karega

    console.log("Fetching user profile for user:", req.user);
    res.status(200).json({ user: req.user });
}




module.exports.logoutUser = async (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token});
    console.log("Logging out user:", req.user);
    // Clear the user's socketId or any session data if needed
    req.user.socketId = null; // Assuming you want to clear the socketId
    await req.user.save(); // Save the updated user data
    res.status(200).json({ message: "User logged out successfully" });
}