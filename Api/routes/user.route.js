import  express  from "express";
import { deleteUser, signOut, test, upadteUser } from "../controller/user.controller.js";
// import { verifyToken } from "../utils/validUser.js";


const router  = express.Router();

router.get('/' ,test);
router.put('/update/:id', upadteUser)
router.delete('/delete/:id', deleteUser);
router.post('/signOut', signOut);

export default router;