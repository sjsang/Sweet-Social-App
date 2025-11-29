import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import PostList from "../../components/posts/PostList";

const Home = () => {
    const navigate = useNavigate();
    const loggedInUserId = localStorage.getItem('userId');

    useEffect(() => {
        if (!loggedInUserId) navigate('/login');
    }, []);

    const handleNavigate = (target) => navigate(target);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await api.get('/posts');
            if (res.data.success) {
                setPosts(res.data.data);
            } else {
                console.error("Lỗi khi lấy bài viết:", res.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi lấy bài viết:", error);
        }
    }

    return (
        <div className="md:w-1/3 m-auto">
            <p
                className="text-fuchsia-600 ml-1 hover:underline cursor-pointer"
                onClick={() => handleNavigate(`/users/${loggedInUserId}`)}>Trang cá nhân
            </p>

            <PostList posts={posts} currentUser={loggedInUserId} />
        </div>
    );
};

export default Home;