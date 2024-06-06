import Navbar from "../layout/navbar/Navbar";
import Sidebar from "../layout/sidebar/Sidebar";
import "./home.scss";

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="mt-3">
                    <h1 className="text-center">Hello ! Welcome Anh Em đã đến với trang web của chúng tôi</h1>
                    <h3 className="text-center text-danger">jewelryauction.bet</h3>
                </div>
            </div>
        </div>
    );
}

export default Home;