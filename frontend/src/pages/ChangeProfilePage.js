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
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("profilePictureData updated (length):", profilePictureData.length);
  }, [profilePictureData]);


  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const response = await request("get", "/profile", null, true);
        setUsername(response.data.username);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setBio(response.data.bio);
        setProfilePictureData(response.data.profilePictureData);
        setProfilePictureType(response.data.profilePictureType);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(profilePictureData.length);

      await request(
        "put",
        "/profile/change",
        {
          firstName,
          lastName,
          email,
          bio,
          profilePictureData,
          profilePictureType,
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
    />
  );
}

export default ChangeProfilePage;
