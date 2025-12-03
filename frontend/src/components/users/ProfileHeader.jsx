import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig";

const ProfileHeader = ({ user, posts, loggedInUserId }) => {
    const { id } = useParams();

    const [displayUser, setDisplayUser] = useState(user);
    const [postsLength, setPostsLength] = useState(posts.length);
    const [isAnotherUser, setIsAnotherUser] = useState(loggedInUserId !== id);
    const [isFollowed, setIsFollowed] = useState(
        user.followers.map(f => f._id.toString()).includes(loggedInUserId)
    );
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        username: user.username,
        name: user.name,
        avatar: null
    });
    const [loading, setLoading] = useState(false);

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

    const handleSave = async () => {
        if (loading) return;

        setLoading(true);

        const formData = new FormData();
        formData.append("name", editedData.name);
        formData.append("username", editedData.username);
        if (editedData.avatar) {
            formData.append("avatar", editedData.avatar);
        }

        try {
            const res = await api.patch(`/users/${displayUser._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (res.data.success) {
                setDisplayUser(res.data.data);
                setIsEditing(false);
            }
        } catch (err) {
            console.log("Lỗi cập nhật:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditedData({
            username: displayUser.username,
            name: displayUser.name,
            avatar: null
        });
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-3 rounded-lg shadow">
            <div className="flex gap-3">
                <input
                    type="file"
                    className="hidden"
                    id="avatarInput"
                    onChange={(e) =>
                        setEditedData({ ...editedData, avatar: e.target.files[0] })
                    }
                />

                <div
                    className={`${isEditing ? "cursor-pointer" : ""} relative`}
                    onClick={() => isEditing && document.getElementById("avatarInput").click()}
                >
                    <Avatar
                        src={
                            editedData.avatar
                                ? URL.createObjectURL(editedData.avatar)
                                : displayUser.avatar
                        }
                        sx={{ width: 100, height: 100 }}
                        className={isEditing ? "opacity-25" : ""}
                    />
                    {isEditing && <i class="fa-solid fa-camera text-3xl text-gray-800 absolute top-1/2 left-1/2 -translate-1/2"></i>}
                </div>

                <div className="flex flex-col grow">
                    <div>
                        {isEditing ? (
                            <div className="flex justify-between">
                                <div>
                                    <input
                                        className="border border-gray-300 rounded outline-0 px-2 py-1 w-full"
                                        value={editedData.username}
                                        onChange={(e) =>
                                            setEditedData({ ...editedData, username: e.target.value })
                                        }
                                    />
                                    <input
                                        className="border border-gray-300 rounded outline-0 px-2 py-1 w-full my-2"
                                        value={editedData.name}
                                        onChange={(e) =>
                                            setEditedData({ ...editedData, name: e.target.value })
                                        }
                                    />
                                </div>

                                {isEditing && (
                                    <div className="h-fit flex gap-1">
                                        <button
                                            className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-green-600'}
                                                        py-1 px-2 bg-green-500 text-white rounded
                                                        transition-colors duration-200`
                                            }
                                            onClick={handleSave}
                                            disabled={loading}
                                        >
                                            Lưu
                                        </button>

                                        <button
                                            className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-rose-600'}
                                                            py-1 px-2 bg-rose-500 text-white rounded
                                                            transition-colors duration-200`
                                            }
                                            onClick={handleCancel}
                                            disabled={loading}
                                        >
                                            Hủy
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <p className="font-bold text-lg">{displayUser.username}</p>
                                <p className="mt-1">{displayUser.name}</p>
                            </>
                        )}
                    </div>

                    {!isEditing && (
                        <div className="flex gap-5 mt-auto">
                            <p><strong>{postsLength}</strong> bài viết</p>
                            <p><strong>{displayUser.followers.length}</strong> người theo dõi</p>
                            <p><strong>{displayUser.following.length}</strong> đang theo dõi</p>
                        </div>
                    )}
                </div>

                {!isEditing && (
                    <i
                        className="fa-solid fa-pen ms-auto cursor-pointer"
                        onClick={() => setIsEditing(true)}
                    ></i>
                )}
            </div>
            <div className="text-center">
                {isAnotherUser ? (
                    isFollowed ? (
                        <p
                            className="mt-3 py-1 px-2 rounded text-white bg-rose-500 hover:bg-rose-600 transition-colors duration-300 ease-in-out cursor-pointer"
                            onClick={toggleFollow}
                        >
                            Bỏ theo dõi
                        </p>
                    ) : (
                        <p
                            className="mt-3 py-1 px-2 rounded text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out cursor-pointer"
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