const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// Define the Captain schema
const captainSchema = new mongoose.Schema({
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
  },
  status:{
    type:String,
    enum: ['active', 'inactive'],
    default: 'active' // Default status is 'active'
  },

  vehicle: {
    color:{
        type: String,
        required: [true, "Vehicle color is required"],
        minlength: [3, "Vehicle color must be at least 3 characters"]
    },
    plate:{
        type: String,
        required: [true, "Vehicle plate is required"],
        minlength: [3, "Vehicle plate must be at least 3 characters"]
    },
    capacity: {
        type: Number,
        required: [true, "Vehicle capacity is required"],
        min: [1, "Vehicle capacity must be at least 1"]
    },
    vehicleType: {
        type: String,
        required: [true, "Vehicle type is required"],
        enum: ['car','motorcycle', 'auto'], // Example vehicle types
        default: 'car' // Default vehicle type
    }
  },
 location:{
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
},
  missionsCompleted: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // Adds createdAt & updatedAt automatically
});


captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.secret_key,
    { expiresIn: "24h" }
  );
  return token;
}

captainSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

captainSchema.statics.hashPassword = async function (plainPassword) {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

const captainModel= mongoose.model('Captain', captainSchema);

module.exports = captainModel;
//captain model create karke  export kardenge usko taaki query likh sakein

