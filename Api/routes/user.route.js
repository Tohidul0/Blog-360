import  express  from "express";
import { alluser, deleteUser, signOut, test, upadteUser } from "../controller/user.controller.js";
// import { verifyToken } from "../utils/validUser.js";
import { varifyToken } from './../utils/validUser.js';


const router  = express.Router();

router.get('/' ,test);
router.put('/update/:id', upadteUser)
router.delete('/delete/:id', deleteUser);
router.post('/signOut', signOut);
router.get('/alluser',varifyToken, alluser);

export default router;