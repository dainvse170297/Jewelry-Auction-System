import Navbar from "../layout/navbar/Navbar";
import Sidebar from "../layout/sidebar/Sidebar";
import "./home.scss";

const Home = () => {

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                Home page
            </div>
        </div>
    );
}

export default Home;