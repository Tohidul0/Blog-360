import  express  from "express";
import { test, upadteUser } from "../controller/user.controller.js";
// import { verifyToken } from "../utils/validUser.js";


const router  = express.Router();

router.get('/' ,test);
router.put('/update/:id', upadteUser)

export default router;