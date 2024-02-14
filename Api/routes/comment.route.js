import  express  from "express";
import { varifyToken } from "../utils/validUser.js";
import { allcomment } from "../controller/comment.controller.js";

const router = express.Router();

router.post('/create',  allcomment)

export default router;