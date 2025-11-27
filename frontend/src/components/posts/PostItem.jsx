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

const PostItem = ({ post, currentUser, onDeletePost }) => {
    const [isLike, setIsLike] = useState(post.likes.includes(currentUser));
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [loading, setLoading] = useState(false);

    const handleLike = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const res = await api.post(`/posts/${post._id}/like`);
            if (res.data.success) {
                setIsLike(!isLike);
                setLikeCount(res.data.data.likes.length);
            }
        } catch (error) {
            console.log('Lỗi khi thích/bỏ thích bài viết: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClickTrashIcon = () => {
        if (confirm('Bạn có chắc chắn muốn xóa bài viết?'))
            onDeletePost(post._id);
    }

    return (
        <div className='mb-5 space-y-2'>
            <div className="flex items-center gap-2 ms-2">
                <Avatar
                    src={post.user.avatar}
                />
                <div>
                    <strong>{post.user.username}</strong>
                    <p className='text-xs text-gray-500'>{timeAgo(post.createdAt)}</p>
                </div>
                {
                    currentUser === post.user._id
                        ? <i
                            className="fa-regular fa-trash-can ms-auto me-2 text-red-500 cursor-pointer"
                            onClick={handleClickTrashIcon}
                        ></i>
                        : ''
                }
            </div>
            {post.content && <p className='ms-2'>{post.content}</p>}
            {post.image && <img src={post.image} className="md:rounded-lg" />}
            <div className="flex gap-3 ms-2">
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