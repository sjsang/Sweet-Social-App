import SideBarMenu from "../../components/layout/SideBarMenu";
import Header from "../../components/layout/Header";

const Notifications = () => {
    return (
        <div>
            <Header />
            <div className="md:flex md:justify-center md:gap-5">
                <div className="hidden md:block md:w-1/5">
                    <SideBarMenu activePage={'notifications'} />
                </div>

                <div className="md:w-1/3">
                    middle
                </div>

                <div className="hidden md:block md:w-1/5">
                    <div className="sticky top-20 bg-white p-4 rounded-3xl shadow">
                        <p className="font-bold mb-2">Sidebar phải</p>
                        <p>Nội dung thêm</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications;