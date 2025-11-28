import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import PostForm from "../../components/posts/PostForm";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreatePost = async (form) => {
        if (loading) return;

        setLoading(true);

        try {
            const formData = new FormData();
            if (form.content)
                formData.append('content', form.content);
            if (form.image)
                formData.append('image', form.image);

            const res = await api.post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success)
                navigate('/');
            else
                console.log('Lỗi khi tạo bài viết: ', res.data.message);
        } catch (error) {
            console.log('Lỗi khi tạo bài viết: ', error);
        }
    }
    return (
        <div className="w-100 m-auto space-y-3">
            <h1 className="text-3xl font-semibold text-gray-800">Tạo bài viết</h1>
            < PostForm onSubmit={handleCreatePost} loading={loading} />
        </div>
    );
};

export default NewPost;