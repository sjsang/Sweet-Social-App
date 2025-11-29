import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/users/ProfileHeader";
import PostList from "../../components/posts/PostList";

const Profile = () => {
    const { id } = useParams();
    const loggedInUser = localStorage.getItem('userId');

    const navigate = useNavigate();
    const handleNavigate = (target) => navigate(target);


    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await api.get(`/users/${id}`);
            if (res.data.success) {
                setUser(res.data.data.user);
                setPosts(res.data.data.posts);
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin:", error);
        }
    }

    const handleToggleFollow = async () => {
        try {
            const res = await api.post(`/users/${user._id}/follow`);
            if (res.data.success)
                setUser(res.data.data.user);
        } catch (error) {
            console.log('Có lỗi khi theo dõi/bỏ theo dõi: ', error);
        }
    }

    return (
        <div className="md:w-1/3 m-auto mt-5 space-y-3">
            <div>
                {user && posts &&
                    <ProfileHeader
                        user={user}
                        postCount={posts.length}
                        loggedInUser={loggedInUser}
                        onClickLogout={() => handleNavigate('/login')}
                        onClickFollow={handleToggleFollow}
                    />
                }
            </div>
            {loggedInUser === user?._id &&
                <p
                    className="hover:underline cursor-pointer"
                    onClick={() => handleNavigate('/posts/new')}>Tạo bài viết
                </p>
            }
            <p
                className="hover:underline cursor-pointer"
                onClick={() => handleNavigate('/')}>Trang chủ
            </p>

            <hr className="text-gray-200" />

            <div>
                {posts && <PostList posts={posts} currentUser={loggedInUser} />}
            </div>
        </div>
    )
}

export default Profile;