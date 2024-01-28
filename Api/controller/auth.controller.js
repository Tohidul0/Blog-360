import User from "../models/user.model.js";
import  bcryptjs from 'bcryptjs'

export const signUp = async (req, res) => {
   const {username, email, passwoard  } = req.body;

   if(!username || !email || !passwoard || username === '' || email === '' || passwoard == ''){
    return (res.status(400).json({message : 'All files are required!!!'}));
   }
    //    hashing passworad with bycriptjs----------------------------
   const hashpasswoard =bcryptjs.hashSync(passwoard)
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
    res.status(500).json({message : err.message});
   }
   
};