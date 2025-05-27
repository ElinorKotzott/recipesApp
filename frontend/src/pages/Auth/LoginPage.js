//cares for the login logic, sends props to login component and gets the full html back
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../../axiosHelper';
import Login from '../../components/Login';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await request('post', '/login', { username, password }, false);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            if (error.response) {
                alert('Login failed: ' + error.response.data.message);
            } else {
                alert('Error: ' + error.message);
            }
        }
    };

    return (
        <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}/>
    );
};

export default LoginPage;
