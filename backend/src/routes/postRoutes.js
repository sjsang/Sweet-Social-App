import express from 'express';
const router = express.Router();
import { uploadPostImage } from "../middlewares/upload.js";
import { authMiddleware } from '../middlewares/auth.js';
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    toggleLikePost,
    commentPost,
} from "../controllers/postController.js";

// /api/posts

router.post('/', authMiddleware, uploadPostImage.single('image'), createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.patch('/:id', authMiddleware, uploadPostImage.single('image'), updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.post('/:id/like', authMiddleware, toggleLikePost);
router.post('/:id/comment', authMiddleware, commentPost);

export default router;