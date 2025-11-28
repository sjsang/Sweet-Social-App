import Avatar from '@mui/material/Avatar';
import timeAgo from '../../functions/timeAgo';

const PostHeader = ({ post, truncate }) => {
    if (!post) return null;

    const content = post.content
        ? truncate
            ? post.content.length > truncate
                ? post.content.slice(0, truncate) + '...'
                : post.content
            : post.content
        : '';

    return (
        <div className='space-y-3 p-3'>
            <div className="flex items-center gap-2">
                <Avatar src={post.user.avatar} sx={{ width: 50, height: 50 }} />
                <div>
                    <strong>{post.user.username}</strong>
                    <p className='text-xs opacity-50'>{timeAgo(post.createdAt)}</p>
                </div>
            </div>
            {content && <p>{content}</p>}
        </div>
    );
};

export default PostHeader;