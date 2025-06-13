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
}

export default ChangeProfilePage;
