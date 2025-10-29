import express from "express";
const router = express.Router();
import { authMiddleware } from '../middlewares/auth.js';
import {
    updateComment,
    deleteComment,
} from "../controllers/commentController.js";

// /api/comments

router.patch('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

export default router;