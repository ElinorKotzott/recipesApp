import PrimaryButton from "./buttons/PrimaryButton.js";
import DrawImage from "./DrawImage";
import ProfilePictureCropper from './ProfilePictureCropper';
import { useState, useEffect } from 'react';


const Profile = ({
  username,
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
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [tempProfilePictureData, setTempProfilePictureData] = useState("");
  const [tempProfilePictureType, setTempProfilePictureType] = useState("");

  useEffect(() => {
      if (profilePictureData && profilePictureType) {
        setTempProfilePictureData(profilePictureData);
        setTempProfilePictureType(profilePictureType);
      }
    }, [profilePictureData, profilePictureType]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setTempProfilePictureData(base64String);
      setTempProfilePictureType(file.type);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      //setCropParams(null); - this is needed but also not needed. what now? tempCropParams?
      handleShowCropper();
    };

    reader.readAsDataURL(file);
  };

  const handleCropSave = ({ croppedAreaPixels, crop, zoom }) => {
    setProfilePictureData(tempProfilePictureData);
    setProfilePictureType(tempProfilePictureType);
    setCropParams({
      crop,
      croppedAreaPixels,
      zoom
    });
    setShowCropper(false);
  };


   const handleShowCropper = () => {
     setShowCropper(true);
   };

   const handleShowCropperFromExistingImage = () => {
     setTempProfilePictureData(profilePictureData);
     setTempProfilePictureType(profilePictureType);

     const crop = cropParams?.crop ?? { x: 0, y: 0 };
     const zoom = cropParams?.zoom ?? 1;

     setCrop(crop);
     setZoom(zoom);
     setShowCropper(true);
   };


   const handleCloseCropper = () => {
     setTempProfilePictureData(profilePictureData);
     setTempProfilePictureType(profilePictureType);
     setShowCropper(false);
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

        {tempProfilePictureData && tempProfilePictureType && (
          <ProfilePictureCropper
            tempProfilePictureData={tempProfilePictureData}
            tempProfilePictureType={tempProfilePictureType}
            onCropSave={handleCropSave}
            handleShowCropper={handleShowCropper}
            handleCloseCropper={handleCloseCropper}
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

          {tempProfilePictureData && tempProfilePictureType && (
          <div>

          <DrawImage
          cropParams={cropParams}
          imageData={tempProfilePictureData}
          imageType={tempProfilePictureType}
          />

          <PrimaryButton type="button" onClick={handleShowCropperFromExistingImage}>
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
