import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SubmitButton from './SubmitButton.js'

function Header() {

    const navigate = useNavigate();

    //logs user out by removing their token and redirects to login page
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return(
        <div id="header-container-id">
            <header>
                <h1>My website</h1>
                <nav id="nav-id">
                    <Link to="/">Home</Link>
                    {' | '}
                    <Link to="/">Create</Link>
                    {' | '}
                    <Link to="/">Favorites</Link>
                    {' | '}
                    <Link to="/">Profile</Link>
                    {' | '}
                    <SubmitButton onClick={handleLogout}>Logout</SubmitButton>
                </nav>
                <hr></hr>
            </header>
        </div>
    );
}


export default Header;