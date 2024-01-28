import express  from  'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'

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

app.listen(3000, ()=>{
    console.log("port 3000 is running  !!!!")
});

app.use('/api/user' ,userRouter);
app.use('/api', authRouter );