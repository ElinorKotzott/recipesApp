import {useNavigate} from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton.js";
import DrawImage from "../components/DrawImage.js";
import {useUser} from "../context/UserContext";


function ProfilePage() {
    const navigate = useNavigate();
    const { profile = {} } = useUser();

    if (!profile) return null;

    return (
        <div className="profile-page">
            <div className="profile-container">
                <h2>My Profile</h2>

                <div>
                    {(profile?.image?.imageData && profile?.image?.imageType) ?

                        <DrawImage
                            cropParameters={profile.image.cropParameters}
                            imageData={profile.image.imageData}
                            imageType={profile.image.imageType}
                            imageStyle={{
                                display: "block",
                                width: "150px",
                                height: "150px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                margin: "1rem 0",
                            }}

                        />
                        :
                        <img src={"/default-profile-picture-all-grey.png"}
                             alt="default-profile-picture"
                             style={{
                                 overflow: "hidden",
                                 borderRadius: "50%",
                                 marginBottom: "1rem",
                                 objectFit: "cover",
                                 width: "100px",
                             }}
                        />
                    }

                </div>

                <p>Username: {profile.username}</p>
                <p>Email: {profile.email}</p>
                <p>First Name: {profile.firstName}</p>
                <p>Last Name: {profile.lastName}</p>
                <p>Bio: {profile.bio || "Tell us something about yourself!"}</p>

                <PrimaryButton onClick={() => navigate("/profile/change")}>
                    Edit Profile
                </PrimaryButton>
            </div>
        </div>
    );
}

export default ProfilePage;
