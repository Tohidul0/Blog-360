import {errorHendeler} from "../utils/error.js";
import User from "../models/user.model.js";
import  bcryptjs from 'bcryptjs'
 
 export const test = (req, res) =>{
    res.json("API connected");
 };


 export const upadteUser = async (req, res, next) => {
        const {username} =req.body
        console.log(username)
        console.log(req.body)
        console.log(req.params.id)
      //   if (req.user._id !== req.params.userId) {
      //    return next(errorHendeler(403, 'You are not allowed to update this user'));
      //  }
       if (req.body.password) {
         if (req.body.password.length < 6) {
           return next(errorHendeler(400, 'Password must be at least 6 characters'));
         }
         req.body.password = bcryptjs.hashSync(req.body.password, 10);
       }
       if (req.body.username) {
         console.log((req.body.username))
         if (req.body.username.length < 7 || req.body.username.length > 20) {
           return next(
            errorHendeler(400, 'Username must be between 7 and 20 characters')
           );
         }
         if (req.body.username.includes(' ')) {
           return next(errorHendeler(400, 'Username cannot contain spaces'));
         }
        //  if (req.body.username !== req.body.username.toLowerCase()) {
        //    return next(errorHendeler(400, 'Username must be lowercase'));
        //  }
         if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
           return next(
            errorHendeler(400, 'Username can only contain letters and numbers')
           );
         }
       }
       try {
         const updatedUser = await User.findByIdAndUpdate(
           req.params.id,
           {
             $set: {
               username: req.body.username,
               email: req.body.email,
               // profilePicture: req.body.profilePicture,
               password: req.body.password,
             },
           },
           { new: true }
         );
         const { password, ...rest } = updatedUser._doc;
         res.status(200).json(rest);
       } catch (error) {
         next(error);
       }
 }

 export const deleteUser = async  (req, res, next) =>{
  const _id =req.params.id;
    try{
      const validUser = await User.findOne({_id});
      if(validUser){
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User deleted")
      }
      else{
        return next(errorHendeler(404, 'user not found'))
      }
    }
    catch(err){
      next(errorHendeler(err))
    }
 }