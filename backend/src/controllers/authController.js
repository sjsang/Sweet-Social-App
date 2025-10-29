import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const existingUsername = await User.findOne({ username });
        if (existingUsername)
            return res.status(400).json({ message: 'Username đã tồn tại.' });

        const existingEmail = await User.findOne({ email });
        if (existingEmail)
            return res.status(400).json({ message: 'Email đã tồn tại.' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, username, email, password: hashedPassword });

        return res.status(201).json({
            success: true,
            message: 'Đăng ký thành công.',
            data: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser)
            return res.status(404).json({ message: 'Username không tồn tại.' });

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Mật khẩu không chính xác.' });

        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công.',
            data: {
                _id: existingUser._id,
                name: existingUser.name,
                username: existingUser.username,
                email: existingUser.email,
                token: generateToken(existingUser._id),
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        if (!user)
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

        return res.status(200).json({
            success: true,
            message: 'Lấy thông tin người dùng thành công.',
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    registerUser,
    loginUser,
    getCurrentUser,
};