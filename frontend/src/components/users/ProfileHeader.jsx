import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const ProfileHeader = ({ user, posts, loggedInUserId }) => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [displayUser, setDisplayUser] = useState(user);
    const [postsLength, setPostsLength] = useState(posts.length);
    const [isAnotherUser, setIsAnotherUser] = useState(loggedInUserId !== id);
    const [isFollowed, setIsFollowed] = useState(
        user.followers.map(f => f._id.toString()).includes(loggedInUserId)
    );

    useEffect(() => {
        setDisplayUser(user);
        setPostsLength(posts.length);
        setIsFollowed(
            user.followers.map(f => f._id.toString()).includes(loggedInUserId)
        );
    }, [user, posts]);

    useEffect(() => {
        setIsAnotherUser(loggedInUserId !== id);
    }, [id]);

    const toggleFollow = async () => {
        try {
            const res = await api.post(`/users/${displayUser._id}/follow`);
            if (res.data.success) {
                setDisplayUser(res.data.data.user);
                setIsFollowed(!isFollowed);
            }
        } catch (error) {
            console.log('Có lỗi khi theo dõi/bỏ theo dõi: ', error);
        }
    }

    return (
        <div className="flex gap-3 bg-white p-3 rounded-3xl shadow">
            <Avatar src={displayUser.avatar} sx={{ width: 100, height: 100 }} />

            <div className="flex flex-col justify-around">
                <div>
                    <p className="font-bold text-lg">{displayUser.username}</p>
                    <p>{displayUser.name}</p>
                </div>

                <div className="flex gap-5">
                    <p><strong>{postsLength}</strong> bài viết</p>
                    <p><strong>{displayUser.followers.length}</strong> người theo dõi</p>
                    <p><strong>{displayUser.following.length}</strong> đang theo dõi</p>
                </div>
            </div>

            <div className="ms-auto h-fit">
                {isAnotherUser ? (
                    isFollowed ? (
                        <p
                            className="py-1 px-2 rounded-3xl text-white bg-rose-500 cursor-pointer"
                            onClick={toggleFollow}
                        >
                            Bỏ theo dõi
                        </p>
                    ) : (
                        <p
                            className="py-1 px-2 rounded-3xl text-white bg-blue-500 cursor-pointer"
                            onClick={toggleFollow}
                        >
                            Theo dõi
                        </p>
                    )
                ) : ''}
            </div>
        </div>
    );
};

export default ProfileHeader;