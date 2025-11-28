import { useNavigate } from 'react-router-dom';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

const PostItem = ({ post, currentUser }) => {
    // Gửi kèm vị trí cũ của trang chủ 
    // khi xem chi tiết bài viết
    const navigate = useNavigate();
    const goToDetail = () => navigate(`/posts/${post._id}`, {
        state: {
            scrollY: window.scrollY
        }
    });

    return (
        <div className='mb-3 shadow md:rounded-2xl bg-white'>
            <PostHeader post={post} />

            {post.image && <img src={post.image} onClick={goToDetail} className='cursor-pointer' />}

            <PostFooter currentUser={currentUser} post={post} onCommentClick={goToDetail} />
        </div>
    );
};

export default PostItem;