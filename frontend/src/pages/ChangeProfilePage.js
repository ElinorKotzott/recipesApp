import { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import { request } from '../axiosHelper';
import { useNavigate } from 'react-router-dom';

function ChangeProfilePage() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;
            try {
                const response = await request('get', '/profile', null, true);
                setUsername(response.data.username);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setBio(response.data.bio);
                setImage(response.data.image);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [token]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await request('put', '/profile/change', {
                username,
                firstName,
                lastName,
                email,
                bio,
                image
            }, true);
            navigate('/profile');
            alert("Profile updated successfully!");
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Update failed!');
        }
    };

    return (
            <Profile
                username={username}
                setUsername={setUsername}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                bio={bio}
                setBio={setBio}
                handleProfileUpdate={handleProfileUpdate}/>
        );
}

export default ChangeProfilePage;
