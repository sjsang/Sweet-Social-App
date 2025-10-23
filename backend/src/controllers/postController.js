const Post = require('../models/Post');
const Notification = require('../models/Notification');

const createPost = async (req, res) => {
    try {
        const userId = req.userId;
        const { content, image } = req.body;

        if (!content && !image)
            return res.status(400).json({ message: 'Bài viết phải có nội dung hoặc hình ảnh.' });

        const post = await Post.create({
            user: userId,
            content, image
        });

        return res.status(201).json({
            success: true,
            message: `Tạo bài viết thành công.`,
            data: post
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserPosts = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const toggleLikePost = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post)
            return res.status(404).json({ message: 'Không tìm thấy bài viết.' });

        const hasLiked = post.likes.includes(userId);
        if (hasLiked) {
            post.likes = post.likes.filter(u => u.toString() !== userId);
            await post.save();
            return res.status(200).json({
                success: true,
                message: 'Bỏ thích bài viết thành công.', data: post
            });
        } else {
            post.likes.push(userId);
            await post.save();

            if (post.user.toString() !== userId) {
                await Notification.create({
                    recipient: post.user,
                    sender: userId,
                    type: 'like',
                    post: post._id,
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Thích bài viết thành công.',
                data: post
            });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getUserPosts,
    updatePost,
    deletePost,
    toggleLikePost,
};