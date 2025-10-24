const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const {
    updateComment,
    deleteComment,
} = require("../controllers/commentController");

// /api/comments

router.patch('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;