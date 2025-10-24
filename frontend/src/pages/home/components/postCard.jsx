import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState } from 'react';

const PostCard = ({ post }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes.length);

    const handleClickLikeButton = () => {
        setHasLiked(!hasLiked);
        if (hasLiked)
            setLikes(prevLikes => prevLikes - 1);
        else
            setLikes(prevLikes => prevLikes + 1);
    }

    return (
        <Card className='w-full md:w-2/3 lg:w-1/3 mx-auto mb-3 '>
            <CardHeader
                avatar={
                    <Avatar alt="User avatar" src={post.user.avatar} sx={{ width: 42, height: 42 }} />
                }
                title={post.user.username}
                subheader={new Date(post.createdAt).toLocaleString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                })}
                titleTypographyProps={{ fontWeight: '600' }}
                subheaderTypographyProps={{ color: 'text.secondary', fontSize: '0.85rem' }}
            />
            <CardMedia
                component="img"
                height="194"
                image={post.image}
                alt="Post image"
            />
            <CardContent>
                <Typography variant="body2">
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={handleClickLikeButton}>
                    {hasLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton> {likes}
                <IconButton>
                    <ChatBubbleOutlineIcon />
                </IconButton> {post.commentCount}
            </CardActions>
        </Card >
    );
}

export default PostCard;