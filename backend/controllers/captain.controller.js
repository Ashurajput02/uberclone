const captainModel=require('../models/captain.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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