import { useNavigate } from 'react-router-dom';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

const PostItem = ({ post, loggedInUserId }) => {
    const navigate = useNavigate();
    const goToDetail = () => navigate(`/posts/${post._id}`);

    return (
        <div className='group relative mb-0.5 md:mb-3  md:rounded-lg shadow border-gray-400 overflow-hidden'>
            {post.image ? (
                <div className='bg-black flex items-center text-shadow'>
                    <img
                        src={post.image}
                        className='w-full'
                    />

                    <div className='w-full absolute bottom-0 text-white bg-linear-to-t from-black/60 via-black-20 to-transparen'>
                        <div>
                            <div className='hidden md:flex'>
                                <PostHeader post={post} truncate={150} />
                            </div>
                            <div className='flex md:hidden'>
                                <PostHeader post={post} truncate={45} />
                            </div>
                        </div>
                        <PostFooter loggedInUserId={loggedInUserId} post={post} onCommentClick={goToDetail} />
                    </div>
                </div>
            ) : (
                <div className='w-full text-black bg-white'>
                    <PostHeader post={post} />
                    <PostFooter loggedInUserId={loggedInUserId} post={post} onCommentClick={goToDetail} />
                </div>
            )}
        </div>
    );
};

export default PostItem;