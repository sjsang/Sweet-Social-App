const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const {
    createPost,
    getAllPosts,
    getPostById,
    getUserPosts,
    updatePost,
    deletePost,
    toggleLikePost,
} = require("../controllers/postController");

// /api/posts

router.post('/', authMiddleware, createPost);
router.get('/', getAllPosts);
router.get('/user/:userId', authMiddleware, getUserPosts);
router.get('/:id', getPostById);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.post('/:id/like', authMiddleware, toggleLikePost);

module.exports = router;