import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    userId : {
    type : String,
    require : true
    },
    postId : {
    type : String,
    require : true
    },
    
    content : {
        type : String
    },
    likes :{
        type: Array,
        default : []
    },
    numberOfLikes :{
        type: Number,
        default : 0,
    }
  
    
}, {timestamps : true});
const Comment = mongoose.model('Comment', commentSchema );
export default Comment;