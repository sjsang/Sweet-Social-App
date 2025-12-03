import { useNavigate } from "react-router-dom";
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PublicIcon from '@mui/icons-material/Public';

const SideBarMenu = ({ activePage }) => {
    const navigate = useNavigate();
    const handleNavigate = (target) => navigate(target);

    const activeClass = 'bg-linear-to-r from-[#8114b0] via-[#ff4291] to-[#f7ff3c] text-white';

    return (
        <div className="w-[90%] space-y-2 sticky top-20">
            <div className={`${activePage === 'home' ? `${activeClass}` : 'bg-white'} p-2 shadow rounded-lg`}>
                <div
                    className="cursor-pointer flex items-center gap-5"
                    onClick={() => handleNavigate('/')}
                >
                    <PublicIcon sx={{ fontSize: 30 }} />
                    <p>Bảng tin</p>
                </div>
            </div>
            <div className={`${activePage === 'explore' ? `${activeClass}` : 'bg-white'} p-2 shadow rounded-lg`}>
                <div
                    className="cursor-pointer flex items-center gap-5"
                    onClick={() => handleNavigate('/explore')}
                >
                    <ExploreOutlinedIcon sx={{ fontSize: 30 }} />
                    <p>Khám phá</p>
                </div>
            </div>
            <div className={`${activePage === 'new' ? `${activeClass}` : 'bg-white'} p-2 shadow rounded-lg`}>
                <div
                    className="cursor-pointer flex items-center gap-5"
                    onClick={() => handleNavigate('/posts/new')}
                >
                    < AddCircleOutlineOutlinedIcon sx={{ fontSize: 30 }} />
                    <p>Tạo bài viết</p>
                </div>
            </div>
        </div>
    )
}

export default SideBarMenu;