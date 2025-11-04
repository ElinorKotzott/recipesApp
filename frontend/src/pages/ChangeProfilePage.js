import { useState, useEffect } from "react";
import Profile from "../components/Profile";
import { request } from "../axiosHelper";
import { useNavigate } from "react-router-dom";

function ChangeProfilePage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePictureData, setProfilePictureData] = useState("");
  const [profilePictureType, setProfilePictureType] = useState("");
  const [cropParams, setCropParams] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const response = await request("get", "/profile", null, true);
        const cropInfo = response.data.imageDTO?.cropParametersDTO;

        setUsername(response.data.username);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setBio(response.data.bio);
        setProfilePictureData(response.data.imageDTO?.imageData);
        setProfilePictureType(response.data.imageDTO?.imageType);
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
  }, [token]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await request(
        "put",
        "/profile/change",
        {
          firstName,
          lastName,
          email,
          bio,
          imageDTO: {
            imageData: profilePictureData,
            imageType: profilePictureType,
            cropParametersDTO: cropParams ? {
              x: cropParams.croppedAreaPixels.x,
              y: cropParams.croppedAreaPixels.y,
              width: cropParams.croppedAreaPixels.width,
              height: cropParams.croppedAreaPixels.height,
              zoom: cropParams.zoom,
              xForCropper: cropParams.crop?.x ?? 0,
              yForCropper: cropParams.crop?.y ?? 0
            } : null
          }
        },
        true
      );
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Update failed!");
    }
  };


  return (
    <Profile
      username={username}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      bio={bio}
      setBio={setBio}
      profilePictureData={profilePictureData}
      setProfilePictureData={setProfilePictureData}
      profilePictureType={profilePictureType}
      setProfilePictureType={setProfilePictureType}
      handleProfileUpdate={handleProfileUpdate}
      cropParams={cropParams}
      setCropParams={setCropParams}
    />
  );
}

export default ChangeProfilePage;
