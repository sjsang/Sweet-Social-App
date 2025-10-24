const Comment = require('../models/Comment');

const updateComment = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const { content } = req.body;

        if (!content?.trim()) {
            return res.status(400).json({ message: 'Nội dung bình luận không được để trống.' });
        }

        const updatedComment = await Comment.findOneAndUpdate(
            { _id: id, user: userId },
            { content },
            { new: true }
        );

        if (!updatedComment)
            return res.status(404).json({ message: 'Không tìm thấy bình luận hoặc không có quyền.' });

        return res.status(200).json({
            success: true,
            message: 'Chỉnh sửa bình luận thành công.',
            data: updatedComment
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const deletedComment = await Comment.deleteOne({ _id: id, user: userId });

        if (deletedComment.deletedCount === 0)
            return res.status(404).json({ message: 'Không tìm thấy bình luận hoặc không có quyền.' });

        return res.status(200).json({
            success: true,
            message: 'Xóa bình luận thành công.',
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    updateComment,
    deleteComment,
};