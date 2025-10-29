import express from "express";
const router = express.Router();
import { authMiddleware } from '../middlewares/auth.js';
import {
    registerUser,
    loginUser,
    getCurrentUser
} from "../controllers/authController.js";

// /api/auth

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getCurrentUser);

export default router;