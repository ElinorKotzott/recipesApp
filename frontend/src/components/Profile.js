import PrimaryButton from "./buttons/PrimaryButton.js";
import ManageImageCropper from './ManageImageCropper';


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

  return (
    <div className="profile-container">
      <h2>Welcome to your profile, {username}</h2>
      <form className="profile-form" onSubmit={handleProfileUpdate}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          disabled
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

        {profilePictureData && profilePictureType && (
          <ManageImageCropper
            imageData={profilePictureData}
            imageType={profilePictureType}
            setImageData={setProfilePictureData}
            setImageType={setProfilePictureType}
            cropParams={cropParams}
            setCropParams={setCropParams}
            aspect={1}
            cropShape="round"
            />

            )}

        {/*<label htmlFor="image">Profile Picture</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control"
        />

          <PrimaryButton type="button" onClick={handleShowCropperFromExistingImage}>
            Edit Crop
          </PrimaryButton>*/}

        <div>

        <PrimaryButton style={{ width: "100%" }} type="submit">Save Changes</PrimaryButton>

        </div>
      </form>
    </div>
  );
};

export default Profile;
