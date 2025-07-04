import { useState, useEffect } from 'react';
import { request } from '../axiosHelper';
import { useNavigate, useLocation } from 'react-router-dom';
import SubmitButton from '../components/SubmitButton.js';

function ProfilePage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePictureData, setProfilePictureData] = useState('');
    const [profilePictureType, setProfilePictureType] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;
            try {
                const response = await request('get', '/profile', null, true);
                const data = response.data;
                setUsername(data.username);
                setEmail(data.email);
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setBio(data.bio);
                setProfilePictureData(data.profilePictureData);
                setProfilePictureType(data.profilePictureType);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [token, location.state]);

    return (
        <>
            <div className="profile-container">
                <h2>My Profile</h2>

                <img
                    src={
                    profilePictureData ? `data:${profilePictureType};base64,${profilePictureData}`: '/default-profile-picture-all-grey.png'
                    }
                    alt="Profile"
                    className="profile-picture"
                />

                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <p>First Name: {firstName}</p>
                <p>Last Name: {lastName}</p>
                <p>Bio: {bio || "Tell us something about yourself!"}</p>

                <SubmitButton onClick={() => navigate('/profile/change')}>
                    Edit Profile
                </SubmitButton>
            </div>
        </>
    );
}

export default ProfilePage;
