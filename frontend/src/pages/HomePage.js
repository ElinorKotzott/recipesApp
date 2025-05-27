//cares for the register logic, sends props to register component and gets the full html back
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


function HomePage () {
    const token = localStorage.getItem('token');

    if (!token) {
        return <p>You must be logged in to view this page!</p>;
    }

    return (
        <>
            <Header/>
            <Footer/>
        </>
    );
}

export default HomePage;
