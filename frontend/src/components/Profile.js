import PrimaryButton from "./buttons/PrimaryButton.js";
import DrawImage from "./DrawImage";
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
  cropParams,
  setCropParams
}) => {
  const [isCropping, setIsCropping] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)


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

  const handleCropSave = (croppedAreaPixels) => {
    console.log(zoom);
    setCropParams({
      x: croppedAreaPixels.x,
      y: croppedAreaPixels.y,
      width: croppedAreaPixels.width,
      height: croppedAreaPixels.height,
      zoom: zoom
    });
    console.log(cropParams);
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
          readOnly
          className="form-control"
        />

        <label htmlFor="email" >Email</label>
        <input
          type="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          required
          onChange={(e) => setFirstName(e.target.value)}
          className="form-control"
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
          className="form-control"
        />

        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="form-control"
        />

        {isCropping && profilePictureData && profilePictureType && (
          <ProfilePictureCropper
            profilePictureData={profilePictureData}
            profilePictureType={profilePictureType}
            setIsCropping={setIsCropping}
            onCropSave={handleCropSave}
            handleShowCropper={handleShowCropper}
            handleCloseCropper={handleCloseCropper}
            setProfilePictureData={setProfilePictureData}
            setProfilePictureType={setProfilePictureType}
            crop={crop}
            setCrop={setCrop}
            zoom={zoom}
            setZoom={setZoom}
            croppedAreaPixels={croppedAreaPixels}
            setCroppedAreaPixels={setCroppedAreaPixels}
            showCropper={showCropper}
          />
        )}

        <label htmlFor="image">Profile Picture</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control"
        />

          {profilePictureData && profilePictureType && !isCropping && (
          <div>

          <DrawImage
          cropParams={cropParams}
          imageData={profilePictureData}
          imageType={profilePictureType}
          />

          <PrimaryButton type="button" onClick={handleShowCropper}>
                          Edit Crop
          </PrimaryButton>

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
