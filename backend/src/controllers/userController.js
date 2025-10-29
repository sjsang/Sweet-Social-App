import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Notification from '../models/Notification.js';

const searchUsers = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q)
            return res.status(400).json({ message: 'Vui lòng nhập từ khóa tìm kiếm.' });


        const users = await User.find({
            $or: [
                { username: { $regex: q, $options: 'i' } },
                { name: { $regex: q, $options: 'i' } }
            ]
        }).select('name username avatar');

        if (users.length === 0)
            return res.status(404).json({ message: 'Không tìm thấy người dùng nào.' });

        return res.status(200).json({
            success: true,
            message: `Tìm thấy ${users.length} người dùng.`,
            data: users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .select('-password')
            .populate('followers', 'username avatar')
            .populate('following', 'username avatar');
        if (!user)
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });

        const posts = await Post.find({ user: id })
            .sort({ createdAt: -1 })
            .select('content image likes createdAt');

        return res.status(200).json({
            success: true,
            message: 'Lấy thông tin và bài viết của người dùng thành công.',
            data: { user, posts }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        if (userId.toString() !== id.toString())
            return res.status(403).json({ message: 'Không có quyền chỉnh sửa.' });

        const { name, username, email, avatar } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
            _id: { $ne: userId }
        });
        if (existingUser)
            return res.status(400).json({ message: 'Tên người dùng hoặc email đã được sử dụng.' });

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name, username, email, avatar
            },
            { new: true }
        ).select('-password');

        if (!updatedUser)
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

        return res.status(200).json({
            success: true,
            message: 'Chỉnh sửa thông tin người dùng thành công.',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        if (userId.toString() !== id.toString())
            return res.status(403).json({ message: 'Không có quyền xóa.' });

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser)
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

        await Promise.all([
            Post.deleteMany({ user: id }),
            Comment.deleteMany({ user: id }),
            Notification.deleteMany({
                $or: [{ recipient: id }, { sender: id }]
            }),
            Post.updateMany(
                { likes: id },
                { $pull: { likes: id } }
            ),
            User.updateMany(
                { followers: id },
                { $pull: { followers: id } }
            ),
            User.updateMany(
                { following: id },
                { $pull: { following: id } }
            )
        ]);

        return res.status(200).json({
            success: true,
            message: 'Xóa tài khoản người dùng thành công.',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const toggleFollow = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        if (userId.toString() === id.toString())
            return res.status(400).json({ message: 'Không thể theo dõi chính mình.' });

        const user = await User.findById(userId).select('following');
        const targetUser = await User.findById(id).select('followers');

        if (!targetUser)
            return res.status(404).json({ message: 'Người dùng không tồn tại.' });

        user.following ||= [];
        targetUser.followers ||= [];

        let message = '';

        if (user.following.includes(id)) {
            user.following.pull(id);
            targetUser.followers.pull(userId);
            message = 'Đã hủy theo dõi.';
        } else {
            user.following.push(id);
            targetUser.followers.push(userId);
            message = 'Theo dõi thành công.';
            await Notification.create({
                recipient: targetUser._id,
                sender: user._id,
                type: 'follow'
            });
        }

        await Promise.all([user.save(), targetUser.save()]);

        return res.status(200).json({
            success: true,
            message,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    searchUsers,
    getUserById,
    updateUser,
    deleteUser,
    toggleFollow,
};
