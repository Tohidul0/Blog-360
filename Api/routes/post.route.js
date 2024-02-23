import  express  from "express";
import { allpost, createPost } from "../controller/post.controller.js";
import { varifyToken } from "../utils/validUser.js";
import multer from 'multer';


const router = express.Router();



// Multer configuration for handling file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       console.log(req.body)
//       cb(null,  '../upload/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//     },
//   });

  // const upload = multer({ storage: storage });

router.post('/create', varifyToken,  createPost) ;
router.get('/allposts', allpost)

export default router;