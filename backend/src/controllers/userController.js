const User = require('../models/User');

/**
 * @desc   Tìm kiếm người dùng theo tên hoặc username
 * @route  GET /api/users/search?query=...
 * @access Public
 */
const searchUsers = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc   Lấy thông tin người dùng theo ID
 * @route  GET /api/users/:id
 * @access Public
 */
const getUserById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc   Cập nhật thông tin người dùng (chỉ chính chủ)
 * @route  PATCH /api/users/:id
 * @access Private
 */
const updateUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc   Xóa tài khoản người dùng (chỉ chính chủ)
 * @route  DELETE /api/users/:id
 * @access Private
 */
const deleteUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc   Theo dõi người dùng khác
 * @route  POST /api/users/:id/follow
 * @access Private
 */
const followUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc   Bỏ theo dõi người dùng khác
 * @route  POST /api/users/:id/unfollow
 * @access Private
 */
const unfollowUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    searchUsers,
    getUserById,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
};
