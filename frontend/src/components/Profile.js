import PrimaryButton from "./buttons/PrimaryButton.js";
import ProfilePictureCropper from './ProfilePictureCropper';
import { useState } from 'react';


const Profile = ({
  username,
  setUsername,
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  bio,
  setBio,
  profilePictureData,
  setProfilePictureData,
  profilePictureType,
  setProfilePictureType,
  handleProfileUpdate,
}) => {
  const [isCropping, setIsCropping] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setProfilePictureData(base64String);
      setProfilePictureType(file.type);
      setIsCropping(true);
    };

    reader.readAsDataURL(file);
  };

  const handleCropSave = (croppedData, croppedType) => {
    setProfilePictureData(croppedData);
    setProfilePictureType(croppedType);

    console.log(profilePictureData.length);

    setIsCropping(false);

  };

  return (
    <div className="profile-container">
      <h2>Welcome to your profile, {username}</h2>
      <form onSubmit={handleProfileUpdate}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        {isCropping && profilePictureData && profilePictureType && (
          <ProfilePictureCropper
            profilePictureData={profilePictureData}
            profilePictureType={profilePictureType}
            setProfilePictureData={setProfilePictureData}
            setProfilePictureType={setProfilePictureType}
            setIsCropping={setIsCropping}
            onCropSave={handleCropSave}
          />
        )}

        <label htmlFor="image">Profile Picture</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        {profilePictureData && profilePictureType && !isCropping && (
          <img
            src={`data:${profilePictureType};base64,${profilePictureData}`}
            alt="Cropped Preview"
            style={{
              width: 150,
              height: 150,
              objectFit: 'cover',
              borderRadius: '50%',
              marginBottom: '1rem',
            }}
          />
        )}

        <PrimaryButton type="submit">Save Changes</PrimaryButton>
      </form>
    </div>
  );
};

export default Profile;
