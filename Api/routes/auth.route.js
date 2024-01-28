import express from 'express';
import { signUp } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signUp', signUp);

export default router;

