const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
    try {
        const userId = req.userId;

        const notifications = await Notification.find({ recipient: userId })
            .populate('sender', 'username')
            .populate('post', 'content')
            .sort({ createAt: -1 });

        return res.status(200).json({
            success: true,
            message: 'Lấy thông báo thành công.',
            data: notifications
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const notification = await Notification.findOneAndUpdate(
            { _id: id, recipient: userId },
            { read: true },
            { new: true }
        );

        if (!notification)
            return res.status(404).json({ message: 'Không tìm thấy thông báo.' });

        return res.status(200).json({
            success: true,
            message: 'Đánh dấu đã đọc thành công.',
            data: notification
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const markAllAsRead = async (req, res) => {
    try {
        const userId = req.userId;

        const result = await Notification.updateMany(
            { recipient: userId, read: false },
            { read: true },
        );

        if (result.matchedCount === 0)
            return res.status(404).json({ message: 'Không có thông báo nào để đánh dấu.' });

        return res.status(200).json({
            success: true,
            message: `Đã đánh dấu ${result.modifiedCount} thông báo là đã đọc.`,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const notification = await Notification.findOneAndDelete({ _id: id, recipient: userId });
        if (!notification)
            return res.status(404).json({ message: 'Không tìm thấy thông báo.' });

        return res.status(200).json({
            success: true,
            message: `Xóa thông báo thành công.`,
            data: notification
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
};