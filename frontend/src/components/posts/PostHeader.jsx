import Avatar from '@mui/material/Avatar';

import timeAgo from '../../functions/timeAgo';

const PostHeader = ({ post }) => {
    return (
        post && <div className="flex items-center gap-2">
            <Avatar
                src={post.user.avatar}
            />
            <div>
                <strong>{post.user.username}</strong>
                <p className='text-xs text-gray-500'>{timeAgo(post.createdAt)}</p>
            </div>
        </div>
    )
}

export default PostHeader;