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
    image,
    setImage,
    handleProfileUpdate
}) => {

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setImage(base64String);
        };
        reader.readAsDataURL(file);
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

                <label htmlFor="image">Profile Picture</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <SubmitButton>Save Changes</SubmitButton>
            </form>
        </div>
    );
};

export default Profile;
