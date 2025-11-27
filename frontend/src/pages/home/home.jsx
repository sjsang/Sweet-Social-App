import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

import { useNavigate } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    const handleNavigate = (target) => navigate(target);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

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
        <div>
            <h1>Home page</h1>
            <p
                className="text-red-600 ml-1 hover:underline cursor-pointer"
                onClick={() => handleNavigate('/login')}>Đăng xuất
            </p>
            <p
                className="text-indigo-600 ml-1 hover:underline cursor-pointer"
                onClick={() => handleNavigate('/posts/new')}>Tạo bài viết
            </p>
        </div>
    );
};

export default Home;