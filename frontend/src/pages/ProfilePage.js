//displays homepage to logged in users only
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


function ProfilePage () {
    const token = localStorage.getItem('token');
    const response = await request('get', '/profile', null, true);
    const username = response.data.username;

    if (!token) {
        return <p>You must be logged in to view this page!</p>;
    }

    return (
        <>
            <Header/>
            <p>Welcome to your personal profile, { username }</p>
            <Footer/>
        </>
    );
}

export default ProfilePage;
