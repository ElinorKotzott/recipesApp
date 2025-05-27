//cares for the register logic, sends props to register component and gets the full html back
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../../axiosHelper';
import Register from '../../components/Register';


const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await request('post', '/register', { username, password });
            navigate('/login');
        } catch (error) {
            if (error.response) {
                alert('Registration failed: ' + error.response.data.message);
            } else {
                alert('Error: ' + error.message);
            }
        }
    };

    return (
        <Register
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleRegister={handleRegister}/>
    );
}

export default RegisterPage;
