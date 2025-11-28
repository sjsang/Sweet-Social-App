import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import timeAgo from "../../functions/timeAgo";
import api from "../../api/axiosConfig";
import PostHeader from './PostHeader';
import Avatar from '@mui/material/Avatar';

const PostDetail = () => {
    // Lấy vị trí cũ của trang chủ 
    // và gửi ngược lại trang chủ
    const location = useLocation();
    const scrollY = location.state?.scrollY || 0;
    const navigate = useNavigate();
    const handleExit = () => navigate('/', { state: { scrollY } });

    // Lấy chi tiết bài viết
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [postComments, setPostComments] = useState([]);
    useEffect(() => {
        fetchPost();
    }, []);
    const fetchPost = async () => {
        try {
            const res = await api.get(`/posts/${id}`);
            if (res.data.success) {
                setPost(res.data.data.post);
                setPostComments(res.data.data.comments);
            }
        } catch (error) {
            console.log('Lỗi khi lấy bài viết: ', error);
        }
    }

    // Thêm bình luận
    const [isActive, setIsActive] = useState(true);
    const [comment, setComment] = useState({ content: '', });
    const handleChange = (e) => {
        const value = e.target.value;
        setComment({ content: value });
        setIsActive(value.trim() === '');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`/posts/${id}/comment`, comment);
            if (res.data.success) {
                setComment({ content: '' });
                setPostComments(prev => [res.data.data, ...prev]);
                setIsActive(true);
            }
        } catch (error) {
            console.log('Lỗi khi thêm bình luận: ', error);
        }
    }

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 md:h-screen flex items-center justify-center bg-neutral-950">
                {post?.image
                    ? (
                        <img
                            src={post.image}
                            alt="post"
                            className="max-w-full max-h-full object-contain"
                        />)
                    : (
                        <div className="text-gray-400">
                            Không có ảnh.
                        </div>)
                }
            </div>

            <div className="w-full md:w-1/4 md:h-screen overflow-x-hidden relative">
                <div className='sticky top-0 z-10 bg-white'>
                    <div className="flex justify-between">
                        <PostHeader post={post} />
                        <i
                            className="fa-solid fa-xmark text-lg text-gray-500 m-3 cursor-pointer"
                            onClick={handleExit}
                        ></i>
                    </div>
                    <hr className='text-gray-200' />
                </div>

                <p className='font-medium m-3'>Tất cả bình luận ({postComments.length})</p>

                <div className="space-y-3 px-3">
                    {postComments && postComments.length > 0
                        ? (postComments.map((c) => (
                            <div key={c._id} className="flex gap-2">
                                <Avatar src={c.user?.avatar} sx={{ width: 28, height: 28 }} />
                                <div>
                                    <div className="max-w-100 bg-gray-100 py-2 px-3 rounded-xl">
                                        <p className="text-sm font-semibold">{c.user?.username}</p>
                                        <p>{c.content}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 ms-3">{timeAgo(c.createdAt)}</span>
                                </div>
                            </div>)))
                        : (<p className="text-sm text-gray-500">Chưa có bình luận nào.</p>)
                    }
                </div>

                <div className="h-15"></div>

                <div className="fixed right-0 bottom-0 w-full md:w-1/4 p-3 bg-white border-t border-gray-200">
                    <form onSubmit={handleSubmit} className="flex">
                        <input
                            type="text"
                            value={comment.content}
                            placeholder='Viết bình luận...'
                            onChange={handleChange}
                            className="flex-1 outline-0"
                        />
                        <button type='submit' disabled={isActive} className={`${isActive ? ' opacity-50' : ''} cursor-pointer`}>
                            <i
                                className="fa-solid fa-paper-plane text-blue-500 text-2xl"
                            ></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;