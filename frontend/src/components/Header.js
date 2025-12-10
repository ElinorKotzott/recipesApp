import LogoutButton from "./buttons/LogoutButton";
import Nav from 'react-bootstrap/Nav';

function Header() {
    return (<header>
            <div className="header-top">
                <div className="title-and-nav">
                    <h1>My recipes app</h1>

                    <Nav variant="underline">
                        <Nav.Item>
                            <Nav.Link href="/home">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/create">Create</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/favorites">Favorites</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="logout-button-container">
                    <LogoutButton/>
                </div>
            </div>
            <hr/>
        </header>

    );
}

export default Header;
