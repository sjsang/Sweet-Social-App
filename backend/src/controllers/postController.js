const Post = require('../models/Post');
const Comment = require('../models/Comment');
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
        const posts = await Post.find()
            .populate('user', 'username avatar')
            .lean();

        const postsWithCommentCount = await Promise.all(
            posts.map(async (post) => {
                const commentCount = await Comment.countDocuments({ post: post._id });
                return {
                    ...post,
                    commentCount
                };
            })
        );

        postsWithCommentCount.sort((a, b) => {
            if (b.likes.length === a.likes.length) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return b.likes.length - a.likes.length;
        });

        return res.status(200).json({
            success: true,
            message: `Lấy tất cả bài viết thành công.`,
            data: postsWithCommentCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id).populate('user', 'username avatar');
        if (!post)
            return res.status(404).json({ message: 'Không tìm thấy bài viết.' });

        const postComments = await Comment.find({ post: id })
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: `Lấy chi tiết bài viết thành công.`,
            data: {
                post: post,
                comment: postComments
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const { content, image } = req.body;

        const updatedPost = await Post.findOneAndUpdate(
            { _id: id, user: userId },
            { content, image },
            { new: true }
        );

        if (!updatedPost)
            return res.status(404).json({ message: 'Không tìm thấy bài viết hoặc không có quyền chỉnh sửa.' });

        return res.status(200).json({
            success: true,
            message: `Chỉnh sửa bài viết thành công.`,
            data: updatedPost
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const deletedPost = await Post.findOneAndDelete({ _id: id, user: userId });
        if (!deletedPost)
            return res.status(404).json({ message: 'Không tìm thấy bài viết hoặc không có quyền xóa.' });

        await Comment.deleteMany({ post: id });
        await Notification.deleteMany({ post: id });

        return res.status(200).json({
            success: true,
            message: `Xóa bài viết thành công.`,
        });
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

const commentPost = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params
        const { content } = req.body;

        if (!content?.trim())
            return res.status(400).json({ message: 'Nội dung bình luận không được để trống.' });

        const post = await Post.findById(id).select('user');
        if (!post)
            return res.status(404).json({ message: 'Không tìm thấy bài viết.' });

        const comment = await Comment.create({
            post: id,
            user: userId,
            content
        });

        if (post.user.toString() !== userId.toString()) {
            await Notification.create({
                recipient: post.user,
                sender: userId,
                type: 'comment',
                post: id
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Thêm bình luận thành công.',
            data: comment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    toggleLikePost,
    commentPost,
};