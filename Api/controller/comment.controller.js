import Comment from '../models/postComment.model.js';
import { errorHendeler } from './../utils/error.js';



export const allcomment = async (req, res, next) =>{
    const {userId, postId, content} = req.body;
    console.log(userId, postId, content)
    if(!userId || !postId || !content){
        return  next(errorHendeler('All field required'))
      }
    console.log(req.body)
    const newComment = new Comment({
        userId,
        postId,
        content,
    });
    try{
        
        
        await newComment.save()
        res.json(newComment)
    }
    catch(err){
      return  next(errorHendeler(err))
    }
 }


 export const getAllComment = async(req, res, next) =>{
    try{
      const allComment = await Comment.find({postId : req.params.postId}).sort({
        createdAt : -1,
      });
      res.status(200).json(allComment);
    }
    catch(err){
      next(err);
    }
 }


export const likeComment = async (req, res, next) =>{

  const comment = await Comment.findById(req.params.commentId)
  try{
    const userIndex =  comment.likes.indexOf(req.user.id)
    if(userIndex === -1){
      comment.numberOfLikes +=1;
      comment.likes.push(req.user.id)
    }
    else{
      comment.numberOfLikes -=1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  }
  catch(err){
    next(err)
  }
}