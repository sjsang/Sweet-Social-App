const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const {
    searchUsers,
    getUserById,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
} = require("../controllers/userController");

// /api/users

router.get('/search', searchUsers);
router.get('/:id', getUserById);
router.patch('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.post('/:id/follow', authMiddleware, followUser);
router.post('/:id/unfollow', authMiddleware, unfollowUser);

module.exports = router;