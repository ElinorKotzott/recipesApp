import Header from '../components/Header';
import Footer from '../components/Footer';
import LogoutButton from '../components/LogoutButton';


function HomePage () {
    const token = sessionStorage.getItem('token');

    if (!token) {
        return <p>You must be logged in to view this page!</p>;
    }

    return (
        <>
            <Header/>
            <LogoutButton/>
            <Footer/>
        </>
    );
}

export default HomePage;
