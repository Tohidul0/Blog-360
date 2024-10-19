import express from "express";
import { allpost, createPost } from "../controller/post.controller.js";
import { varifyToken } from "../utils/validUser.js";
import multer from "multer";

const router = express.Router();

router.post("/create", varifyToken, createPost);
router.get("/allposts", allpost);

export default router;
