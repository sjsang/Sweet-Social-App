import express from "express";
const router = express.Router();
import { authMiddleware } from '../middlewares/auth.js';
import {
    searchUsers,
    getUserById,
    updateUser,
    deleteUser,
    toggleFollow,
} from "../controllers/userController.js";

// /api/users

router.get('/search', searchUsers);
router.get('/:id', getUserById);
router.patch('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);
router.post('/:id/follow', authMiddleware, toggleFollow);

export default router;