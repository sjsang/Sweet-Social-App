const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const {
    addComment,
    updateComment,
    deleteComment,
} = require("../controllers/commentController");

// /api/comments

router.post('/', authMiddleware, addComment);
router.patch('/:id', authMiddleware, updateComment);
router.delete('/', authMiddleware, deleteComment);

module.exports = router;