import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

import PostCard from "./components/postCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

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
            if (res.data?.success) {
                setPosts(res.data.data);
            } else {
                console.error("Lỗi khi lấy bài viết:", res.data?.message);
            }
        } catch (error) {
            console.error("Lỗi khi lấy bài viết:", error);
        }
    }

    return (
        <>
            <h1>Home page</h1>
            {
                posts.map((post, index) => <PostCard key={index} post={post} />)
            }
        </>
    );
};

export default Home;