const express = require("express");
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const {
    registerUser,
    loginUser,
    getCurrentUser
} = require("../controllers/authController");

// /api/auth

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;