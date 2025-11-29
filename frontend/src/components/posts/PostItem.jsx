import { useNavigate } from 'react-router-dom';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

const PostItem = ({ post, currentUser }) => {
    const navigate = useNavigate();
    const goToDetail = () => navigate(`/posts/${post._id}`);

    return (
        <div className='group relative mb-0.5 md:mb-3 md:shadow-lg md:rounded-2xl border-gray-400 overflow-hidden'>
            {post.image ? (
                <div className='text-shadow-lg/10 bg-black flex items-center'>
                    <img
                        src={post.image}
                        className='w-full'
                    />

                    <div className='w-full absolute bottom-0 text-white flex justify-between'>
                        <div className='transition-opacity duration-300 ease-in-out group-hover:opacity-15'>
                            <PostHeader post={post} truncate={50} />
                        </div>
                        <div className='self-end'>
                            <PostFooter currentUser={currentUser} post={post} onCommentClick={goToDetail} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-full text-black bg-white flex justify-between'>
                    <PostHeader post={post} />
                    <div className='self-end'>
                        <PostFooter currentUser={currentUser} post={post} onCommentClick={goToDetail} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostItem;