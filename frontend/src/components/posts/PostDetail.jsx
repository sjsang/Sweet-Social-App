import Avatar from '@mui/material/Avatar';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const timeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diff = Math.floor((now - postDate) / 1000);

    if (diff < 60) return `${diff} giây trước`;
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
};

const PostDetail = ({ currentUser }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [postComments, setPostComments] = useState([]);
    const [comment, setComment] = useState({
        content: '',
    });
    const [error, setError] = useState('');

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

    const handleChange = (e) => {
        setError('');
        setComment(prev => ({ ...prev, content: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.content.trim()) {
            setError('Vui lòng nhập bình luận.');
            return;
        }
        try {
            const res = await api.post(`/posts/${id}/comment`, comment);
            if (res.data.success) {
                setComment({ content: '' });
                setPostComments(prev => [res.data.data, ...prev]);
            }
        } catch (error) {
            console.log('Lỗi khi thêm bình luận: ', error);
        }
    }

    return (
        <div className="min-h-screen md:h-screen flex flex-col md:flex-row bg-white">
            <div className="w-full flex items-center justify-center md:w-2/3 h-64 md:h-screen overflow-hidden bg-black">
                {post?.image ? (
                    <img
                        src={post.image}
                        alt="post"
                        className="w-full object-cover"
                    />
                ) : (
                    <div className="text-gray-400">
                        Không có ảnh.
                    </div>
                )}
            </div>

            <aside className="w-full md:w-1/3 h-screen overflow-x-hidden border-l md:border-l md:border-gray-200 px-4">
                <div className='space-y-3 sticky top-0 bg-white'>
                    <div className="flex items-center gap-3 pt-3">
                        <Avatar
                            src={post?.user?.avatar}
                        />
                        <div>
                            <p className="font-semibold">{post?.user?.username}</p>
                            <p className="text-xs text-gray-500">{timeAgo(post?.createdAt)}</p>
                        </div>
                    </div>

                    <div>
                        {post?.content ? (
                            <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
                        ) : null}
                    </div>
                    <p className='font-medium'>{post?.likes.length} lượt thích</p>
                    <hr className='text-gray-300' />
                </div>

                <div className="space-y-3 my-3 min-h-3/4">
                    <p className='font-medium'>Tất cả bình luận ({postComments.length})</p>
                    {postComments && postComments.length > 0 ? (
                        postComments.map((c) => (
                            <div key={c._id} className="flex gap-3 items-start">
                                <img
                                    src={c.user?.avatar}
                                    alt={c.user?.username}
                                    className="w-9 h-9 rounded-full object-cover"
                                />
                                <div>
                                    <div className="flex-1 bg-gray-100 p-2 rounded-xl max-w-fit">
                                        <div className="text-sm">
                                            <span className="font-semibold mr-2">{c.user?.username}</span>
                                        </div>
                                        <p className="text-gray-700">{c.content}</p>
                                    </div>
                                    <span className="text-xs text-gray-400 ms-2">{timeAgo(c.createdAt)}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">Chưa có bình luận nào.</p>
                    )}
                </div>

                <div className="sticky bottom-0 bg-white pt-2 border-t border-gray-300">
                    {error && (
                        <p className="text-red-600 text-sm m-3">{error}</p>
                    )}
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={comment.content}
                            placeholder='Viết bình luận...'
                            onChange={handleChange}
                            className="flex-1 px-3 py-3 outline-0"
                        />
                        <button type='submit'>
                            <i
                                className="fa-solid fa-paper-plane text-blue-500 text-lg"
                            ></i>
                        </button>
                    </form>
                </div>
            </aside>
        </div>
    );
}

export default PostDetail;