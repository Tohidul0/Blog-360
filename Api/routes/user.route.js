import  express  from "express";
import { deleteUser, test, upadteUser } from "../controller/user.controller.js";
// import { verifyToken } from "../utils/validUser.js";


const router  = express.Router();

router.get('/' ,test);
router.put('/update/:id', upadteUser)
router.delete('/delete/:id', deleteUser);

export default router;