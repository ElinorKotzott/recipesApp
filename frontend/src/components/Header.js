import LogoutButton from "./buttons/LogoutButton";
import Nav from 'react-bootstrap/Nav';
import {useUser} from "../context/UserContext";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import DrawImage from "./DrawImage";

function Header() {

    const {profile} = useUser();

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


                <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    rootClose
                    overlay={
                        <Popover className="profile-popover">
                            <Popover.Body>
                                <a className="profile-options-link" href="/Create">Create</a>
                                <a className="profile-options-link" href="/profile">Profile</a>
                                <a className="profile-options-link" href="/favorites">Favorites</a>
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
            <hr/>
        </header>

    );
}

export default Header;
