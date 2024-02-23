import Post from "../models/post.model.js";
import { errorHendeler } from "../utils/error.js"
import path from 'path';







export const createPost = async (req, res, next) =>{
  const { title, catagory, content , image } = req.body;
  console.log(req.body)
  // const imageBuffer = Buffer.from(image, 'base64');
  try{
  if (!req.user.isAdmin){
    return next(errorHendeler(403, 'Unautorized'));
  }
  if(!req.body.title || !req.body.content){
    return next(errorHendeler("required all field"))
  }
  const slug = req.body.title.split(' ').join('-').toLowerCase();
  const newPost = new Post({
    title, catagory, content, image, slug, userId: req.user.id 
  });

    await newPost.save()
    res.json(newPost)
  }
  catch(err){
    next(err);
  }
}

export const allpost = async (req, res, next) =>{
    try{
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 100;
      const sortData = req.query.order ==='asc' ? 1 : -1;
      const posts = await Post.find({
        ...(req.query.userId && {userId : req.query.userId}),
        ...(req.query.catagory && {catagory : req.query.catagory}),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.slug && {slug : req.query.slug}),
        ...(req.query.searchTerm && {
          $or : [
            {title: {$regex : req.query.searchTerm, $options : 'i'}},
            {content: {$regex : req.query.searchTerm, $options : 'i'}},
          ],
        }),
    }).sort({updateAt : sortData}).skip(startIndex).limit(limit);
      
      
      const totalpost = await Post.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      
      
      const lastMonthPost = await Post.countDocuments({
        createdAt :{$gte : oneMonthAgo}
      });

      res.status(200).json({
        posts,
        totalpost,
        lastMonthPost
      });

    }
    catch(err){
      next(err)
    }
}

