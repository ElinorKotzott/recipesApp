import Header from '../components/Header';
import Footer from '../components/Footer';
import LogoutButton from '../components/LogoutButton';
import Recipe from '../components/Recipe';


function HomePage () {
    return (
        <>
            <LogoutButton/>
            <Recipe/>
        </>
    );
}

export default HomePage;
