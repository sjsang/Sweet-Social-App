import { useNavigate } from "react-router-dom";

const Header = ({ onClickLogo }) => {
    const navigate = useNavigate();
    const handleNavigate = (target) => navigate(target);

    return (
        <div className="hidden md:flex items-center w-full h-15 mb-5 sticky top-0 z-10 bg-white shadow">
            <div className="w-[calc(11/15*100%+40px)] m-auto flex">
                <img
                    src="/main-logo.png"
                    className="w-15 cursor-pointer"
                    onClick={onClickLogo ?? (() => handleNavigate('/'))}
                />
            </div>
        </div>
    )
}

export default Header;