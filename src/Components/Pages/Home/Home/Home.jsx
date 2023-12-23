import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import User from '../UsersSection/User';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            {/* <Banner></Banner> */}
            <User></User>
            <Footer></Footer>
        </div>
    );
};

export default Home;