import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import PostList from "../../components/posts/PostList";

const Home = () => {
    const navigate = useNavigate();
    const handleNavigate = (target) => navigate(target);
    // Chưa đăng nhập => Login
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Lấy tất cả bài viết
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

    const currentUser = localStorage.getItem('userId');

    // Scroll đến bài viết trước đó 
    // khi trở về từ trang chi tiết bài viết
    const location = useLocation();
    const [savedScrollY, setSavedScrollY] = useState(null);
    useEffect(() => {
        if (location.state?.scrollY !== undefined)
            setSavedScrollY(location.state.scrollY);
    }, [location]);
    useEffect(() => {
        if (savedScrollY !== null) {
            window.scrollTo(0, savedScrollY);
            setSavedScrollY(null);
        }
    }, [posts]);

    return (
        <div className="md:w-1/3 m-auto">
            <p
                className="text-fuchsia-600 ml-1 hover:underline cursor-pointer"
                onClick={() => handleNavigate(`/users/${currentUser}`)}>Trang cá nhân
            </p>

            <PostList posts={posts} currentUser={currentUser} />
        </div>
    );
};

export default Home;