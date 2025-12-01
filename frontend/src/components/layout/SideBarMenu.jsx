import { useNavigate } from "react-router-dom";
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const SideBarMenu = ({ activePage }) => {
    const navigate = useNavigate();
    const handleNavigate = (target) => navigate(target);

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
            <div className={`${activePage === 'new' ? 'font-bold bg-white rounded-3xl shadow' : ''} p-3`}>
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