import LogoutButton from "./buttons/LogoutButton";
import Nav from 'react-bootstrap/Nav';

function Header() {
    return (<header>
            <div className="header-top">
                <div className="title-and-nav">
                    <h1>My recipes app</h1>

                    <Nav variant="underline">
                        <Nav.Item>
                            <Nav.Link href="/home" className="primary-nav-link">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/create" className="primary-nav-link">Create</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/favorites" className="primary-nav-link">Favorites</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/profile" className="primary-nav-link">Profile</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <LogoutButton/>
            </div>
            <hr/>
        </header>

    );
}

export default Header;
