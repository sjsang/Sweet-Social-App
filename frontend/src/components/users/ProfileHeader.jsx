import Avatar from "@mui/material/Avatar";
import { useState } from "react";

const ProfileHeader = ({ user, postCount, loggedInUser, onClickLogout, onClickFollow }) => {
    const isOtherUser = user._id !== loggedInUser;
    const [isFollowed, setIsFollowed] = useState(user?.followers.some(f => f._id === loggedInUser));
    const [followers, setFollowers] = useState(user.followers?.length);

    const [currentUser, setCurrentUser] = useState(user);

    const handleClickFollow = () => {
        if (isFollowed)
            setFollowers(prev => prev - 1);
        else
            setFollowers(prev => prev + 1);
        setIsFollowed(!isFollowed);
        onClickFollow();
        setCurrentUser(prev => ({ ...prev, followers: followers }));
    }

    return (
        <div className="flex gap-3">
            <Avatar src={currentUser.avatar} sx={{ width: 100, height: 100 }} />

            <div className="flex flex-col justify-around">
                <div>
                    <p className="font-bold text-xl">{currentUser.username}</p>
                    <p>{currentUser.name}</p>
                </div>

                <div className="flex gap-3">
                    <p><strong>{postCount}</strong> bài viết</p>
                    <p><strong>{followers}</strong> người theo dõi</p>
                    <p><strong>{currentUser.following?.length}</strong> đang theo dõi</p>
                </div>
            </div>

            <div className="ms-auto h-fit">
                {isOtherUser ? (
                    isFollowed ? (
                        <p
                            className="py-2 px-3 rounded-2xl text-white bg-rose-500 cursor-pointer"
                            onClick={handleClickFollow}
                        >
                            Bỏ theo dõi
                        </p>
                    ) : (
                        <p
                            className="py-2 px-3 rounded-2xl text-white bg-cyan-500 cursor-pointer"
                            onClick={handleClickFollow}
                        >
                            Theo dõi
                        </p>
                    )
                ) : (
                    <p
                        className="py-2 px-3 rounded-2xl text-white bg-rose-500 cursor-pointer"
                        onClick={onClickLogout}
                    >Đăng xuất</p>
                )}
            </div>
        </div>
    );
};

export default ProfileHeader;
