import express  from  'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

// var cors = require("cors");

// mongodb connect----------------------------
dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("mongodb is connected")
})
.catch(error=>{
    console.log(error);
})


const app = express();

app.use(express.json());
app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true,
    }  
));
app.use(cookieParser());


app.listen(3000, ()=>{
    console.log("port 3000 is running  !!!!")
});


// get API-----------------------------------------------
app.use('/api/user' ,userRouter);

// signUp ApI---------------------------------------
app.use('/api', authRouter );



// error hendleing----------------------------------------
app.use((err, req, res, next) => {
 const statusCode  = req.statusCode || 500;
 const maessage = err.message || 'internal server error';
 res.status(statusCode).json({
    success : 'false',
    statusCode,
    maessage
 })
})