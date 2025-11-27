import { useEffect, useState } from "react";

const PostForm = ({ onSubmit, loading }) => {
    const [form, setForm] = useState({
        content: '',
        image: null,
    });

    const handleChange = (e) => {
        setForm({ ...form, content: e.target.value });
        setError('');
    }

    const handleFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    }

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.content && !form.image) {
            setError('Bài viết phải có nội dung hoặc hình ảnh!');
            return;
        }

        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
                className="w-full min-h-50 outline-0"
                placeholder="Bạn đang nghĩ gì?"
                value={form.content}
                onChange={handleChange}
            ></textarea>
            <input
                type="file"
                onChange={handleFileChange}
            />
            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}
            <button
                className={`w-full border ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} `}
                type="submit"
            >Đăng</button>
        </form>
    );
};

export default PostForm;