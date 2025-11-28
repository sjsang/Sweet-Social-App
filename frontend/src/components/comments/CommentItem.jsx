import { useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import timeAgo from "../../functions/timeAgo";

const CommentItem = ({ comment, currentUser, onClickDeleteComment, onUpdateComment }) => {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [content, setContent] = useState(comment.content);
    const textareaRef = useRef(null);
    const commentRef = useRef(null);
    const [width, setWidth] = useState("auto");

    // Lấy chiều rộng gốc khi render
    useEffect(() => {
        if (commentRef.current) {
            setWidth(commentRef.current.offsetWidth + "px");
        }
    }, []);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [content, editing]);

    // Auto-focus khi editing
    useEffect(() => {
        if (editing && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = textareaRef.current.value.length;
        }
    }, [editing]);

    const handleSave = () => {
        if (content.trim() === "") return;
        onUpdateComment(comment._id, content);
        setEditing(false);
        setOpen(false);
    };

    return (
        <div className="group flex gap-2">
            <div className="mt-2">
                <Avatar src={comment.user.avatar} sx={{ width: 28, height: 28 }} />
            </div>

            <div>
                <div
                    ref={commentRef}
                    className='min-w-fit bg-gray-100 py-2 px-3 rounded-2xl transition-all duration-300'
                >
                    <p
                        className={`text-sm font-semibold
                        ${currentUser === comment.user._id ? 'text-rose-600' : ''}`}
                    >{comment.user.username}</p>

                    {editing
                        ? (
                            <textarea
                                ref={textareaRef}
                                className="border-0 outline-0 overflow-hidden p-1 rounded resize-none"
                                style={{ width }}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        ) : (<p>{content}</p>)
                    }

                    <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-20 mt-2" : "max-h-0"}`}>
                        <div className="flex gap-5 justify-end border-t pt-3 border-gray-200">
                            {editing ? (
                                <>
                                    <button
                                        className="text-sm text-blue-600 cursor-pointer"
                                        onClick={handleSave}
                                    >Lưu</button>
                                    <button
                                        onClick={() => {
                                            setEditing(false);
                                            setContent(comment.content);
                                        }}
                                        className="text-sm text-gray-500 cursor-pointer"
                                    >Hủy</button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="text-sm text-blue-600 cursor-pointer"
                                        onClick={() => setEditing(true)}
                                    >Chỉnh sửa</button>
                                    <button
                                        className="text-sm text-red-600 cursor-pointer"
                                        onClick={() => onClickDeleteComment(comment._id)}
                                    >Xoá</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <span className="text-xs text-gray-500 ms-3">{timeAgo(comment.createdAt)}</span>
            </div>

            <i
                className={`fa-solid fa-ellipsis-vertical p-2 text-gray-500 cursor-pointer invisible 
                        ${currentUser === comment.user._id ? 'group-hover:visible' : ''}`}
                onClick={() => setOpen(!open)}
            ></i>
        </div>
    );
};

export default CommentItem;