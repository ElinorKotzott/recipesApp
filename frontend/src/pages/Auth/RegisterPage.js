//cares for the register logic, sends props to register component and gets the full html back
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../../axiosHelper';
import Register from '../../components/Register';


const RegisterPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            //not sending auth header for register
            await request('post', '/register', { firstName, lastName, email, username, password }, false);
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
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            handleRegister={handleRegister}/>
    );
}

export default RegisterPage;
