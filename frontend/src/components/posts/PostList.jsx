import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import PostItem from "./PostItem";

const PostList = ({ posts, currentUser }) => {
    const [allPosts, setAllPosts] = useState(posts);

    useEffect(() => {
        setAllPosts(posts);
    }, [posts]);

    const handleDeletePost = async (id) => {
        try {
            const res = await api.delete(`/posts/${id}`);
            if (res.data.success)
                setAllPosts(prev => prev.filter(p => p._id !== id));
        } catch (error) {
            const msg = error.response?.data?.message || "Lỗi không xác định.";
            alert(msg);
        }
    }

    return (
        <>
            <div>
                {
                    allPosts.length > 0
                        ? (allPosts.map(post =>
                            <PostItem
                                key={post._id} post={post}
                                currentUser={currentUser}
                                onDeletePost={handleDeletePost}
                            />))
                        : (<p>Chưa có bài viết nào.</p>)
                }
            </div>
        </>
    );
};

export default PostList;