import React, { useState } from 'react';
import { request } from '../axiosHelper';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //to navigate to a different page after login
    const navigate = useNavigate();

        const handleLogin = async (e) => {
            e.preventDefault();
            try {
                const response = await request('post', '/login', { username, password });
                //saving jwt in local storage
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
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label><br />
            <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}/>

            <br/><br/>

            <label htmlFor="password">Password:</label><br />
                <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}/>

            <br/><br/>

            <input type="submit" value="Login" />
        </form>
      );

}

export default Login;
