import {useEffect, useState} from "react";
import {request} from "../axiosHelper";
import {useLocation, useNavigate} from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton.js";
import DrawImage from "../components/DrawImage.js";

function ProfilePage() {
    const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");


  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const response = await request("get", "/profile", null, true);
        const data = response.data;
          setProfile(data);

      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token, location.state]);

  return (
      <div className="profile-container">
        <h2>My Profile</h2>

        <div>
            {(profile.image?.imageData && profile.image?.imageType) ?

        <DrawImage
            cropParameters={profile.image.cropParameters}
            imageData={profile.image.imageData}
            imageType={profile.image.imageType}
            imageStyle={{
                display: "block",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "1rem 0",
            }}

        />
        :
        <img src={"/default-profile-picture-all-grey.png"}
          alt="default-profile-picture"
          style={{overflow: "hidden",
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
    );
}

export default ProfilePage;
