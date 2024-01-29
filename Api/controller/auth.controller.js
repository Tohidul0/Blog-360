import User from "../models/user.model.js";
import  bcryptjs from 'bcryptjs'
import {errorHendeler} from "../utils/error.js";

export const signUp = async (req, res, next) => {
   const {username, email, passwoard  } = req.body;

   if(!username || !email || !passwoard || username === '' || email === '' || passwoard == ''){
      next(errorHendeler(400, 'All files are required!!!' ));
   }
    //    hashing passworad with bycriptjs----------------------------
   const salt = bcryptjs.genSaltSync(10);
   const hashpasswoard =bcryptjs.hashSync(passwoard, salt);
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
    next(err);
   }
   
};