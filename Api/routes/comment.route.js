import  express  from "express";
import { varifyToken } from "../utils/validUser.js";
import { AllComment, allcomment, getOneComment, likeComment } from "../controller/comment.controller.js";

const router = express.Router();

router.post('/create',  allcomment)
router.get('/getcomment/:postId', getOneComment)
router.put('/likeComment/:commentId', varifyToken, likeComment)
router.get('/getAllComment',varifyToken, AllComment)

export default router;