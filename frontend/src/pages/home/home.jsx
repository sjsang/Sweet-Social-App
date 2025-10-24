import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

import PostCard from "./components/postCard";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await api.get('/posts');
            if (res.data?.success) {
                setPosts(res.data.data);
            } else {
                console.error("Lỗi khi đăng nhập:", res.data?.message);
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
        }
    }

    return (
        <>
            {
                posts.map((post, index) => <PostCard key={index} post={post} />)
            }
        </>
    );
};

export default Home;