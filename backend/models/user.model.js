const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: [true, "First name is required 😡"],
      minlength: [3, "First name must be at least 3 characters 😤"]
    },
    lastName: {
      type: String,
      default: "" // Not required, so no validation needed
    }
  },
  email: {
    type: String,
    required: [true, "Email is required 📨"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required 🔐"],
    select:false
  },
  socketId: {
    type: String,
    default: null // Optional — will be set when user connects to socket
  }
}, {
  timestamps: true // Adds createdAt & updatedAt automatically
});

//generarting an auth token using jwt 
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.secret_key,
    { expiresIn: "24h" }
  );
  return token;
};


userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.statics.hashPassword = async function (plainPassword) {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};




const userModel = mongoose.model("User", userSchema);
module.exports=userModel;