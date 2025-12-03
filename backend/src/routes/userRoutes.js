import express from "express";
const router = express.Router();
import { uploadAvatar } from "../middlewares/upload.js";
import { authMiddleware } from '../middlewares/auth.js';
import {
    searchUsers,
    getFeaturedUsers,
    getUserById,
    updateUser,
    deleteUser,
    toggleFollow,
} from "../controllers/userController.js";

// /api/users

router.get('/search', searchUsers);
router.get('/explore', getFeaturedUsers);
router.get('/:id', getUserById);
router.patch('/:id', authMiddleware, uploadAvatar.single('avatar'), updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.post('/:id/follow', authMiddleware, toggleFollow);

export default router;