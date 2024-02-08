import Post from "../models/post.model.js";
import { errorHendeler } from "../utils/error.js"



export const createPost = async (req, res, next) =>{
  if (!req.user.isAdmin){
    return next(errorHendeler(403, 'Unautorized'));
  }
  if(!req.body.title || !req.body.content){
    return next(errorHendeler("required all field"))
  }
  const slug = req.body.title.split(' ').join('-').toLowerCase();
  const newPost = new Post({
    ...req.body, slug, userId: req.user.id
  });
  try{
    await newPost.save()
    res.json('post done succesfully')
  }
  catch(err){
    next(errorHendeler(err));
  }
}