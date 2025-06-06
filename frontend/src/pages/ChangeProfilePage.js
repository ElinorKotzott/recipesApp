import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { request } from '../axiosHelper';
import SubmitButton from '../components/SubmitButton';
import { useNavigate } from 'react-router-dom';

function ChangeProfilePage() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const token = localStorage.getItem('token');
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
                bio
            }, true);
            navigate('/profile');
            alert("Profile updated successfully!");
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Update failed!');
        }
    };

    return (
        <div className="profile-container">
            <Header/>
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

                <SubmitButton>Save Changes</SubmitButton>
            </form>
            <Footer/>
        </div>
    );
}

export default ChangeProfilePage;
