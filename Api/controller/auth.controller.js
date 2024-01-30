import User from "../models/user.model.js";
import  bcryptjs from 'bcryptjs'
import {errorHendeler} from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
   const {username, email, passwoard  } = req.body;

   if(!username || !email || !passwoard || username === '' || email === '' || passwoard == ''){
     return  next(errorHendeler(400, 'All files are required!!!' ));
   }
    //    hashing passworad with bycriptjs----------------------------
   const hashpasswoard =bcryptjs.hashSync(passwoard,10);
   const newUser = User(
    {
        username,
        email,
        passwoard : hashpasswoard
    }
   );
   
   try{
    await newUser.save();
    res.json('SignUp successful')
   }
   catch(err){
    return next(err);
   }
   
};



export const signIn = async (req, res, next) => {
   const { email, passwoard  } = req.body;
   try{
      if(!email || !passwoard){
         return next(errorHendeler(404,'All filed are requred'))
      }
      const validUser = await User.findOne({email});
      if(!validUser){
         return next(errorHendeler(404,'Email not found'))
      }
      const validPasword = bcryptjs.compareSync(passwoard, validUser.passwoard);
      if(!validPasword){
         return next(errorHendeler(400, 'Invalid password'))
      }

      // remove password from user for frontend sequrity--------------------------------
      const {passwoard : pass, ...rest} = validUser._doc;
      const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET)
      res.status(200).cookie('access token', token,{httpOnly : true}).json(rest);
   }
   catch(err){
      return next(err);
   }



}