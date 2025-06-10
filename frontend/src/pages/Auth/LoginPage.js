//cares for the login logic, sends props to login component and gets the full html back
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../../axiosHelper';
import Login from '../../components/Login';

//TODO there is a bug where after a failed login, clicking register will trigger another alert that the login failed

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

     useEffect(() => {
         document.body.style.backgroundImage = "url('/veggies2.jpg')";
         document.body.style.backgroundSize = 'cover';
         document.body.style.backgroundRepeat = 'no-repeat';

         return () => {
             document.body.style.backgroundImage = '';
         };
     }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            //not sending an auth header for the login
            const response = await request('post', '/login', { username, password }, false);
            localStorage.setItem('token', response.data.token);
            navigate('/home');
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
