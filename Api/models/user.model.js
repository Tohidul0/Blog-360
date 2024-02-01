import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true,
        unique : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    passwoard : {
        type : String,
        require : true,
       
    },
    profilePicture : {
        type: String,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsoundcloud.com%2Fsa-sa-46340903%2Ffacebook-null-mp4-mp3&psig=AOvVaw39kdw8q1fmwKRpyVIScYiJ&ust=1706894536516000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIDl9evTioQDFQAAAAAdAAAAABAJ"
    },
}, {timestamps:true});

const User = mongoose.model('User', userSchema);
export default User;