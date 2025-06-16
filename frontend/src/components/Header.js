import { Link } from 'react-router-dom';

function Header() {

    return(
        <div id="header-container-id">
            <header>
                <h1>My recipes app</h1>
                <nav id="nav-id">
                    <Link to="/home">Home</Link>
                    {' | '}
                    <Link to="/create">Create</Link>
                    {' | '}
                    <Link to="/favorites">Favorites</Link>
                    {' | '}
                    <Link to="/profile">Profile</Link>
                </nav>
                <hr></hr>
            </header>
        </div>
    );
}


export default Header;