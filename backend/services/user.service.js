const userModel=require('../models/user.model')


module.exports.createUser = async ({firstname,lastname,email,password}) => {
    //check if any value is null 
    if (!firstname || !lastname || !email || !password) {
        throw new Error("All fields are required");
    }

    //check if user already exists
    const existingUser = await userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        throw new Error("User already exists with this email");
    }

    //create a new user 
    const newUser = new userModel({
        fullName: {
            firstName: firstname,
            lastName: lastname
        },
        email: email.toLowerCase(),
        password: password // Hash the password
    });

    return newUser;
    
}
