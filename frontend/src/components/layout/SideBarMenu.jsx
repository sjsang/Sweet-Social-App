import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import api from "../../api/axiosConfig";
import { useEffect, useState } from "react";

const SideBarMenu = ({ activePage }) => {
    const navigate = useNavigate();
    const handleNavigate = (target) => navigate(target);

    const [user, setUser] = useState([]);
    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        try {
            const res = await api.get('/auth/me');
            if (res.data.success)
                setUser(res.data.data);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error?.response?.data?.message);
        }
    }

    return (
        <div className="w-[80%] space-y-3 sticky top-20">
            <div className={`${activePage === 'home' ? 'font-bold bg-white rounded-3xl shadow' : ''} p-3`}>
                <div
                    className="cursor-pointer flex items-center gap-5"
                    onClick={() => handleNavigate('/')}
                >
                    <ExploreOutlinedIcon sx={{ fontSize: 30 }} />
                    <p>Bảng tin</p>
                </div>
            </div>
            <div className={`${activePage === 'connect' ? 'font-bold bg-white rounded-3xl shadow' : ''} p-3`}>
                <div
                    className="cursor-pointer flex items-center gap-5"
                    onClick={() => handleNavigate('/connect')}
                >
                    <PeopleAltOutlinedIcon sx={{ fontSize: 30 }} />
                    <p>Kết nối</p>
                </div>
            </div>
            <div className={`${activePage === 'notifications' ? 'font-bold bg-white rounded-3xl shadow' : ''} p-3`}>
                <div
                    className="cursor-pointer flex items-center gap-5"
                    onClick={() => handleNavigate('/notifications')}
                >
                    < NotificationsNoneOutlinedIcon sx={{ fontSize: 30 }} />
                    <p>Thông báo</p>
                </div>
            </div>
            <div className={`${activePage === 'new' ? 'font-bold bg-white rounded-3xl shadow' : ''} p-3`}>
                <div
                    className="cursor-pointer flex items-center gap-5"
                    onClick={() => handleNavigate('/posts/new')}
                >
                    < AddCircleOutlineOutlinedIcon sx={{ fontSize: 30 }} />
                    <p>Tạo bài viết</p>
                </div>
            </div>
            <div className={`${activePage === 'profile' ? 'font-bold bg-white rounded-3xl shadow' : ''} p-3`}>
                <div
                    className="cursor-pointer flex items-center gap-5"
                    onClick={() => handleNavigate(`/users/${user._id}`)}
                >
                    <Avatar src={user.avatar} sx={{ width: 30, height: 30 }} />
                    <p>Trang cá nhân</p>
                </div>
            </div>
        </div>
    )
}

export default SideBarMenu;