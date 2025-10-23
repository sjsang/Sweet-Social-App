const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const {
    searchUsers,
    getUserById,
    updateUser,
    deleteUser,
    toggleFollow,
} = require("../controllers/userController");

// /api/users

router.get('/search', searchUsers);
router.get('/:id', getUserById);
router.patch('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.post('/:id/follow', authMiddleware, toggleFollow);

module.exports = router;