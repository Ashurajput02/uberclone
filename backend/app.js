const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const app=express();
const cookieParser = require('cookie-parser');
const connectToDb=require('./db/db')
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');
//iss function ko run karenge 
connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
//api
app.get('/',(req,res)=>{
  res.send('Hello World!');
});

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
module.exports=app;



