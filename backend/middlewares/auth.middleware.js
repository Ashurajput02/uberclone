const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistToken = require('../models/blacklistToken');

//user authentication middleware
module.exports.authUser = async (req, res, next) => {
    console.log("hello i m in auth user middleware starting mein");
    //checking for token
    //token can be in cookie or in header
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    //ab iss token ko verify karna hoga
    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }

    const isBlackListed = await blacklistToken.findOne({token});
    if (isBlackListed) {
        return res.status(401).json({ message: "Token is blacklisted, authorization denied" });
    }

    //if token is present then we will verify it
    //we will use jwt.verify method to verify the token
    try {
        //verify the token
        const decoded = jwt.verify(token, process.env.secret_key);
        //decoded mein vahi data aayega jo humne token banate waqt pass kiya tha
        //decoded.id will give us the user id
        //find the user by id
        console.log("Decoded token:", decoded);
        const user = await userModel.findById(decoded._id); // exclude password from the user object
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        //attach user to request object
        console.log("Authenticated user:", user);
        req.user = user;
        next(); // call next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Token is not valid" });
    }
}