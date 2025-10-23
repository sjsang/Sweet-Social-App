// controllers/commentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

/**
 * @desc   Thêm bình luận vào bài viết
 * @route  POST /api/comments
 * @access Private
 */
const addComment = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc   Cập nhật bình luận (chỉ chính chủ)
 * @route  PATCH /api/comments/:id
 * @access Private
 */
const updateComment = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc   Xóa bình luận (chính chủ hoặc chủ bài viết)
 * @route  DELETE /api/comments
 * @access Private
 */
const deleteComment = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addComment,
    updateComment,
    deleteComment,
};