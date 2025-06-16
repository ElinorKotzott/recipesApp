//displays landingpage to all users
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubmitButton from '../components/SubmitButton.js'



function LandingPage () {
    const navigate = useNavigate();
    return (
        <>
            <Header/>
            <SubmitButton onClick={() => navigate('/login')}>Login</SubmitButton>
            <SubmitButton onClick={() => navigate('/register')}>Register</SubmitButton>
            <Footer/>
        </>
    );
}

export default LandingPage;
