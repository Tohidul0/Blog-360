import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId : {
    type : String,
    


    },
    catagory: {
        type : String
    },
    content : {
        type : String
    },
    title : {
        type : String,
        require : true
    },
    image :{
        type : Buffer,
        default : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    slug :{
        type : String,
    }
}, {timestamps : true});
const Post = mongoose.model('Post', postSchema );
export default Post;