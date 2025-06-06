import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { request } from '../axiosHelper';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

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
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [token]);

    if (!token) {
        return <p>You must be logged in to view this page!</p>;
    }

    return (
        <>
            <Header/>
            <div className="profile-container">
                <h2>My Profile</h2>
                <p><Username: {username}</p>
                <p>Email: {email}</p>
                <p>firstName: {firstName}</p>
                <p>lastName: {lastName}</p>
                <p>Bio: {bio}</p>

                <button onClick={() => navigate('/change-profile')}>
                    Edit Profile
                </button>
            </div>
            <Footer/>
        </>
    );
}

export default ProfilePage;
