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
                    <h1 className="text-center">Hello ! Welcome to my company</h1>
                </div>
            </div>
        </div>
    );
}

export default Home;