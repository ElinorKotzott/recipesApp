import { useState, useEffect } from "react";
import { request } from "../axiosHelper";
import { useNavigate, useLocation } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton.js";
import DrawImage from "../components/DrawImage.js";

function ProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePictureData, setProfilePictureData] = useState("");
  const [profilePictureType, setProfilePictureType] = useState("");
  const [cropParams, setCropParams] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");


  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const response = await request("get", "/profile", null, true);
        const data = response.data;
        const cropInfo = data.imageDTO?.cropParametersDTO;

        setUsername(data.username);
        setEmail(data.email);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setBio(data.bio);
        setProfilePictureData(data.imageDTO?.imageData);
        setProfilePictureType(data.imageDTO?.imageType);
        if (cropInfo) {
          setCropParams({
            crop: {
              x: cropInfo.xForCropper ?? 0,
              y: cropInfo.yForCropper ?? 0
            },
            croppedAreaPixels: {
              x: cropInfo.x ?? 0,
              y: cropInfo.y ?? 0,
              width: cropInfo.width ?? 0,
              height: cropInfo.height ?? 0
            },
            zoom: cropInfo.zoom ?? 1
          });
        }

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
        {(profilePictureData && profilePictureType) ?

        <DrawImage
            cropParams={cropParams}
            imageData={profilePictureData}
            imageType={profilePictureType}
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

        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Bio: {bio || "Tell us something about yourself!"}</p>

        <PrimaryButton onClick={() => navigate("/profile/change")}>
          Edit Profile
        </PrimaryButton>
      </div>
    );
}

export default ProfilePage;
