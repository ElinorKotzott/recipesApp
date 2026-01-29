import LogoutButton from "./buttons/LogoutButton";
import Nav from 'react-bootstrap/Nav';
import DrawImage from "./DrawImage";
import {useUser} from "../context/UserContext";
import Dropdown from 'react-bootstrap/Dropdown';

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



                <Dropdown>
                    <Dropdown.Toggle
                        className="profile-options-dropdown-toggle p-0 border-0 bg-transparent"
                        style={{borderRadius: "50%"}}
                    >
                        {profile?.image?.imageData && profile?.image?.imageType ? (
                            <DrawImage
                                cropParameters={profile.image.cropParameters}
                                imageData={profile.image.imageData}
                                imageType={profile.image.imageType}
                                imageStyle={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    display: "block"
                                }}
                            />
                        ) : (
                            <img
                                src="/default-profile-picture-all-grey.png"
                                alt="default-profile-picture"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    display: "block"
                                }}
                            />
                        )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="mt-2" >
                        <Dropdown.Item style={{ display: "flex", justifyContent: "center"}}>
                            <LogoutButton />
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </div>
            <hr/>
        </header>

    );
}

export default Header;
