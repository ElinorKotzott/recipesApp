import LogoutButton from "./buttons/LogoutButton";
import Nav from 'react-bootstrap/Nav';
import {useUser} from "../context/UserContext";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import DrawImage from "./DrawImage";
import {Link} from "react-router-dom";

function Header() {

    const {profile} = useUser();

    return (<header>
            <div className="header-top">
                <div className="title-and-nav">
                    <h1 className="app-title">
                        <Link to="/home">
                            My recipes app
                        </Link>
                    </h1>

                    <Nav>
                        <Nav.Link as={Link} to="/home" className="primary-nav-link">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/create" className="primary-nav-link">
                            Create Recipe
                        </Nav.Link>
                    </Nav>
                </div>


                <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    rootClose
                    overlay={
                        <Popover className="profile-popover">
                            <Popover.Body>
                                <Link className="profile-options-link" to="/profile">Profile</Link>
                                <Link className="profile-options-link" to="/favorites">Favorites</Link>
                                <LogoutButton/>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <div className="profile-avatar">
                        {profile?.image?.imageData && profile?.image?.imageType ? (
                            <DrawImage
                                cropParameters={profile.image.cropParameters}
                                imageData={profile.image.imageData}
                                imageType={profile.image.imageType}
                                imageStyle={{objectFit: "cover"}}
                            />
                        ) : (
                            <img
                                src="/default-profile-picture-all-grey.png"
                                alt="default profile"
                            />
                        )}
                    </div>
                </OverlayTrigger>


            </div>
        </header>

    );
}

export default Header;
