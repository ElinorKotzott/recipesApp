//fetches user info from backend api at /profile,

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { request } from '../axiosHelper';

function ProfilePage() {
    const [username, setUsername] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;
            try {
                const response = await request('get', '/profile', null, true);
                setUsername(response.data.username);
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
            <Header />
            <p>Welcome to your personal profile, {username}</p>
            <Footer />
        </>
    );
}

export default ProfilePage;
