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
  const [showCropper, setShowCropper] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setProfilePictureData(base64String);
      setProfilePictureType(file.type);
      handleShowCropper();
    };

    reader.readAsDataURL(file);
  };

  const handleCropSave = (croppedData, croppedType) => {
    setProfilePictureData(croppedData);
    setProfilePictureType(croppedType);
    setIsCropping(false);
  };


   const handleShowCropper = () => {
     setShowCropper(true);
     setIsCropping(true);
   };

   const handleCloseCropper = () => {
     setShowCropper(false);
     setIsCropping(false);
   };

  return (
    <div className="profile-container">
      <h2>Welcome to your profile, {username}</h2>
      <form className="profile-form" onSubmit={handleProfileUpdate}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email" >Email</label>
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
            handleShowCropper={handleShowCropper}
            handleCloseCropper={handleCloseCropper}
            showCropper={showCropper}
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
          <div>
          <img
            src={`data:${profilePictureType};base64,${profilePictureData}`}
            alt="Cropped Preview"
            style={{
              display: 'block',
              width: 100,
              height: 100,
              objectFit: 'cover',
              borderRadius: '50%',
              margin: '1rem 0',
            }}
          />
          <PrimaryButton type="button" onClick={handleShowCropper}>Edit Crop</PrimaryButton>
          </div>
        )}

        <div>

        <PrimaryButton style={{ width: "100%" }} type="submit">Save Changes</PrimaryButton>

        </div>
      </form>
    </div>
  );
};

export default Profile;
