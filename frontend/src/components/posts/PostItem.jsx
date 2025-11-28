import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import PostHeader from './PostHeader';

const PostItem = ({ post, currentUser }) => {
    // Gửi kèm vị trí cũ của trang chủ 
    // khi xem chi tiết bài viết
    const navigate = useNavigate();
    const goToDetail = () => navigate(`/posts/${post._id}`, {
        state: { scrollY: window.scrollY }
    });

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

    return (
        <div className='mb-3'>
            <PostHeader post={post} />

            {post.image && <img src={post.image} className="md:rounded-lg" />}

            <div className="flex gap-3 p-3">
                <div className='flex items-center gap-1'>
                    <i
                        className={`fa-heart text-2xl cursor-pointer ${isLike ? 'fa-solid text-red-500' : 'fa-regular'}`}
                        onClick={handleLike}
                    ></i>
                    <span className="font-medium">{likeCount}</span>
                </div>

                <div className='flex items-center gap-1'>
                    <i
                        className="fa-regular fa-comment text-2xl cursor-pointer"
                        onClick={goToDetail}
                    ></i>
                    <span className="font-medium">{post.commentCount}</span>
                </div>
            </div>
        </div>
    );
};

export default PostItem;