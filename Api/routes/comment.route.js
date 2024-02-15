import  express  from "express";
import { varifyToken } from "../utils/validUser.js";
import { allcomment, getAllComment } from "../controller/comment.controller.js";

const router = express.Router();

router.post('/create',  allcomment)
router.get('/getcomment/:postId', getAllComment)

export default router;