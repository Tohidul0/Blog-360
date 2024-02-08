import  express  from "express";
import { createPost } from "../controller/post.controller.js";
import { varifyToken } from "../utils/validUser.js";


const router = express.Router();



router.post('/create',varifyToken, createPost) ;

export default router;