import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useRef, useState } from "react";

const PostForm = ({ onSubmit }) => {
    const imageInputRef = useRef("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [form, setForm] = useState({
        content: '',
        image: null,
    });
    const [previewImage, setPreviewImage] = useState("");

    const handleClick = () => {
        imageInputRef.current.click();
    }

    const handleChange = (e) => {
        setForm({ ...form, content: e.target.value });
        if (form.content || form.image)
            setIsDisabled(false);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, image: file });
        setPreviewImage(URL.createObjectURL(file));
    }

    const handleRemoveFile = () => {
        setForm({ image: null });
        setPreviewImage("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 p-3 rounded-lg shadow bg-white">
            <p className='pb-3 font-bold text-xl text-center border-b border-gray-200'>Tạo bài viết</p>
            <textarea
                className="w-full min-h-50 outline-0"
                placeholder="Chia sẻ cảm xúc của bạn..."
                value={form.content}
                onChange={handleChange}
            ></textarea>


            <input
                ref={imageInputRef}
                type="file"
                className='hidden'
                onChange={handleFileChange}
            />
            <div className='flex gap-2 items-center'>
                <p className='font-medium text-gray-500'>Tải lên khoảnh khắc của bạn:</p>
                <div className='p-2 w-fit rounded-[50%] cursor-pointer hover:bg-gray-100 transition-colors duration-200'>
                    <img
                        src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png"
                        onClick={handleClick}
                    />
                </div>
            </div>

            {previewImage !== "" &&
                <div className='relative w-1/2 group mx-auto'>
                    <img src={previewImage} className='w-full rounded border border-gray-400 group-hover:brightness-25 transition-all duration-200' alt="ảnh bài viết" />
                    <i className='fa-solid fa-trash opacity-0 text-3xl text-rose-500
                     absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer
                      hover:text-rose-600 group-hover:opacity-100
                      transition-all duration-200'
                        onClick={handleRemoveFile}
                    ></i>
                </div>}

            <button
                disabled={isDisabled}
                className={`w-full py-1 px-2 rounded text-white transition-colors duration-200
                      ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 cursor-pointer hover:bg-blue-600'} `
                }
                type="submit"
            >Đăng</button>
        </form>
    );
};

export default PostForm;