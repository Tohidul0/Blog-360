import { error } from 'console';
import express  from  'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

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

app.listen(3000, ()=>{
    console.log("port 3000 is running  !!!!")
});