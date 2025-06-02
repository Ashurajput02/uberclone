const userModel=require('../models/user.model')
const userService=require('../services/user.service');
const { validationResult } = require('express-validator');

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
