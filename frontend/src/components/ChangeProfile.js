import PrimaryButton from "./buttons/PrimaryButton.js";
import ManageImageCropper from './ManageImageCropper';


const ChangeProfile = ({
                           handleProfileUpdate,
                           profile,
                           setProfile
                       }) => {

    function updateProfile(key, value) {
        setProfile(prev => ({
            ...prev,
            [key]: value
        }));
    }


    return (
        <div className="profile-container">
            <h2>Welcome to your profile, {profile.username}</h2>
            <form className="profile-form" onSubmit={handleProfileUpdate}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={profile.username}
                    disabled
                    className="form-control"
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={profile.email}
                    required
                    onChange={(e) => updateProfile("email", e.target.value)}
                    className="form-control"
                />

                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    value={profile.firstName}
                    required
                    onChange={(e) => updateProfile("firstName", e.target.value)}
                    className="form-control"
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={profile.lastName}
                    required
                    onChange={(e) => updateProfile("lastName", e.target.value)}
                    className="form-control"
                />

                <label htmlFor="bio">Bio</label>
                <input
                    type="text"
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => updateProfile("bio", e.target.value)}
                    className="form-control"
                />

                <ManageImageCropper
                    imageOwner={profile}
                    aspect={1}
                    cropShape="round"
                    imageStyle={{
                        display: "block",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        margin: "1rem 0"
                    }}
                    labelName="ChangeProfile Picture"
                    onSaveImage={(imageObj) => updateProfile("image", imageObj)}
                />

                <div>

                    <PrimaryButton style={{width: "100%"}} type="submit">Save Changes</PrimaryButton>

                </div>
            </form>
        </div>
    );
};

export default ChangeProfile;
