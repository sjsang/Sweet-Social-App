import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import api from '../../api/axiosConfig';

const timeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = Math.floor((now - postDate) / 1000);

    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
};

const PostItem = ({ post, currentUser }) => {
    const [isLike, setIsLike] = useState(post.likes.includes(currentUser));
    const [likeCount, setLikeCount] = useState(post.likes.length);

    const handleLike = async () => {
        try {
            const res = await api.post(`/posts/${post._id}/like`);
            if (res.data.success) {
                // toggle isLike
                setIsLike(!isLike);
                // cập nhật số lượng likes
                setLikeCount(res.data.data.likes.length);
            }
        } catch (error) {
            console.log('Lỗi khi thích/bỏ thích bài viết: ', error);
        }
    };

    return (
        <div className='mb-5 space-y-3'>
            <div className="flex items-center gap-2">
                <Avatar
                    src={post.user.avatar}
                />
                <div>
                    <strong>{post.user.username}</strong>
                    <p className='text-xs text-gray-500'>{timeAgo(post.createdAt)}</p>
                </div>
            </div>
            {post.content && <p>{post.content}</p>}
            {post.image && <img src={post.image} className="rounded-xl" />}
            <div className="flex gap-3">
                <div className='flex items-center gap-1'>
                    <i
                        className={`fa-heart text-2xl cursor-pointer ${isLike ? 'fa-solid text-red-500' : 'fa-regular'}`}
                        onClick={handleLike}
                    ></i>
                    <span className="font-medium">{likeCount}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <i className="fa-regular fa-comment text-2xl cursor-pointer"></i>
                    <span className="font-medium">{post.commentCount}</span>
                </div>
            </div>
        </div>
    );
};

export default PostItem;