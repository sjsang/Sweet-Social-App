import express from "express";
const router = express.Router();
import { authMiddleware } from '../middlewares/auth.js';
import {
    getNotifications,
    markAsRead,
    deleteNotification,
} from '../controllers/notificationController.js';

// /api/notifications

router.get('/', authMiddleware, getNotifications);
router.patch('/:id/read', authMiddleware, markAsRead);
router.delete('/:id', authMiddleware, deleteNotification);

export default router;