//displays landingpage to all users
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton.js'


function LandingPage () {
    const navigate = useNavigate();
    return (
        <>
            <h1>Welcome :)</h1>
            <SubmitButton onClick={() => navigate('/login')}>Login</SubmitButton>
            <SubmitButton onClick={() => navigate('/register')}>Register</SubmitButton>
        </>
    );
}

export default LandingPage;
